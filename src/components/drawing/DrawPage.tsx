import React, { FC, useEffect, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import InputColor from 'react-input-color';
import { Button, Typography } from 'antd';
import { reactLocalStorage } from 'reactjs-localstorage';

const { Title } = Typography;

interface DrawPageProps {}

const DrawPage: FC<DrawPageProps> = () => {
  const [colorBrush, setColorBrush] = useState<string>('#5e72e4');
  const [context, setContext] = useState<any>(null);

  const changeColor = (value: any) => {
    setColorBrush(value.hex);
  };

  const canvasRef = useRef<any>(null);
  const canvasDiv = canvasRef.current;

  const undoCanvas = () => {
    canvasRef.current.undo();
  };
  const clearCanvas = () => {
    canvasRef.current.clear();
  };

  const canvasToImg = () => {
    const tagA = document.createElement('a');
    document.body.appendChild(tagA);
    tagA.href = canvasRef.current.canvasContainer.children[1].toDataURL();
    tagA.download = 'canvas-image.png';
    tagA.click();
    document.body.removeChild(tagA);
  };

  const handleSave = (value: any) => {
    canvasToImg();
    reactLocalStorage.set('myPaint', value);
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
          onClick={() => handleSave(canvasRef.current.getSaveData())}
          type="primary"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default DrawPage;
