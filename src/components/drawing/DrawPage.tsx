import React, { FC, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import InputColor from 'react-input-color';
import { Button, Typography } from 'antd';

const { Title } = Typography;

interface DrawPageProps {}

const DrawPage: FC<DrawPageProps> = () => {
  const [colorBrush, setColorBrush] = useState<string>('#5e72e4');
  const [context, setContext] = useState<any>(null);

  const changeColor = (value: any) => {
    console.log(value);
    setColorBrush(value.hex);
  };
  const handleSave = (value: any) => {
    console.log(value);
  };
  const canvasRef = useRef<any>(null);
  const canvasDiv = canvasRef.current;

  console.log(canvasRef, canvasDiv);

  const undoCanvas = () => {
    canvasRef.current.undo();
  };
  const clearCanvas = () => {
    canvasRef.current.clear();
  };

  return (
    <div>
      <Title level={3}>Enjoy your drawing</Title>
      <Title level={5}>change color</Title>
      <InputColor
        initialValue="#5e72e4"
        onChange={changeColor}
        placement="right"
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CanvasDraw
          ref={canvasRef}
          brushRadius={10}
          canvasWidth={800}
          canvasHeight={800}
          brushColor={colorBrush}
          lazyRadius={12}
        />
      </div>
      <div style={{ padding: '20px' }}>
        <Button onClick={clearCanvas} type="primary">
          Clear
        </Button>
        <Button onClick={undoCanvas} type="primary">
          Undo
        </Button>
        <Button
          onClick={() => console.log(canvasRef.current.getSaveData())}
          type="primary"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default DrawPage;
