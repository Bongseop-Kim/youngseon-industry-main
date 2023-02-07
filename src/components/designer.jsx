import React from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import useImage from "use-image";
import TieView from "./tieColor";

export default function Designer({ initialItem, elStage, initialOnChange, selected, setSelected, checkDeselect }) {
  const [pageLoaded, setPageLoaded] = React.useState(false);

  React.useEffect(() => {
    setPageLoaded(true);
    // console.log('designer loaded')
  }, []);

  return (
    <div className="bg-gray rounded-lg">
      <div id="myDesign" ref={elStage} className="relative p-0 lg:p-10 flex justify-center items-center">
        <Stage
          //drag&drop 면적
          className="absolute"
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          width={400}
          height={700}
        >
          <Layer>
            <DesignView
              isSelected={selected}
              data={initialItem}
              design={initialItem.designs[0]}
              onSelect={() => {
                setSelected(true);
              }}
              onChange={initialOnChange}
              width={pageLoaded ? (50 * Math.round((40 * elStage.current.clientWidth) / 100)) / 100 : 0}
            />
          </Layer>
        </Stage>
        <TieView color={initialItem.color} initialItem={initialItem} />
      </div>
    </div>
  );
}

const DesignView = ({ isSelected, onSelect, design, onChange, data }) => {
  const [image] = useImage(design.preview, "Anonymous");
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <React.Fragment>
      <Image
        ref={shapeRef}
        isSelected={isSelected}
        image={image}
        draggable
        {...design.positions}
        onClick={onSelect}
        onTap={onSelect}
        onDragStart={() => {
          onChange({
            ...data,
            designs: data.designs.map((arg) => {
              return arg.label === "main_logo"
                ? {
                    ...data.designs[0],
                    positions: {
                      ...data.designs[0].positions,
                      isDragging: true,
                    },
                  }
                : arg;
            }),
          });
        }}
        onDragEnd={(e) => {
          onChange({
            ...data,
            designs: data.designs.map((arg) => {
              return arg.label === "main_logo"
                ? {
                    ...data.designs[0],
                    positions: {
                      ...data.designs[0].positions,
                      isDragging: false,
                      x: e.target.x(),
                      y: e.target.y(),
                    },
                  }
                : arg;
            }),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...data,
            designs: data.designs.map((arg) => {
              return arg.label === "main_logo"
                ? {
                    ...data.designs[0],
                    positions: {
                      ...data.designs[0].positions,
                      x: node.x(),
                      y: node.y(),
                      // set minimal value
                      width: Math.max(5, node.width() * scaleX),
                      height: Math.max(node.height() * scaleY),
                    },
                  }
                : arg;
            }),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};
