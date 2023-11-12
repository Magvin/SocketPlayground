import { observer } from "mobx-react";
import { io } from "socket.io-client";
import { useAppContext } from "../context";
import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { JSONEditor } from "reactjs-json-editor";
import "reactjs-json-editor/css/style.css";
import { SomeObject } from "../types/SomeObject";
import theme from "../theme";

interface SocketData {
  id: string;
  userName: string;
  x: string;
  y: string;
}

interface LayerMouseEvent extends MouseEvent {
  layerX?: number;
  layerY?: number;
}

const HomePage = observer(() => {
  const { store } = useAppContext();
  const [connected, setConnected] = useState(false);
  const uniqId = useRef(v4());
  const { id } = useParams();
  const { name, file, changeFileValue } = store.user;

  var socket = io("http://localhost:4000");
  //Respond to various events
  socket.on("connect", function () {
    if (!connected) {
      setConnected(true);
    }
  });
  socket.on("mouse", function (data: SocketData) {
    if (data.id === uniqId.current) return;
    if (data.userName === store.user.name) return;
    if (!document.querySelector("#json")) return;
    moveCursorToPosition(data);
  });
  function moveCursorToPosition(data: SocketData) {
    let element;
    const menuPosition = document.querySelector(
      ".mousePosition"
    ) as HTMLDivElement;
    //Create a div, if it doesn't already exist for this
    if (!menuPosition) {
      element = document.createElement("div");
      //Set ID, class and style (color based on hash of string)
      element.setAttribute("class", "mousePosition");
      element.setAttribute("id", `mousePosition-${data.id}`);
      element.textContent = data.userName;
      //Add to document
      document.querySelector("#json")?.appendChild(element);
    }

    if (!menuPosition) return;
    //Move into position
    menuPosition.style.left = data.x + 50 + "px";
    menuPosition.style.top = data.y + "px";
  }
  socket.on("leave", function (id) {
    const cursor = document.querySelector(`#mousePosition-${id}`);
    const root = document.querySelector("#json");
    if (!cursor || !root) return;

    setTimeout(function () {
      if (cursor.parentNode === root) {
        root.removeChild(cursor);
        return;
      }
    }, 10);
  });

  socket.on("value", (event) => {
    changeFileValue(event.data);
  });

  const sendMousePosition = useCallback(
    (event: LayerMouseEvent) => {
      if (!event.view) return;
      if (!uniqId?.current) return;
      if (!event.layerX || !event.layerY) return;
      socket.emit("mouse", {
        id: uniqId.current,
        userName: name,
        x: event.clientX,
        y: event.clientY,
        x_pct: ((event.layerX / event.view.screen.width) * 100).toFixed(3),
        y_pct: ((event.layerY / event.view.screen.height) * 100).toFixed(3),
      });
    },
    [socket, uniqId, name]
  );

  const handleChangeJson = useCallback(
    (event: SomeObject<string>) => {
      changeFileValue(event);
      socket.emit("json", {
        data: event,
        id,
      });
    },
    [socket, changeFileValue, id]
  );

  const handleOnSave = useCallback(async () => {
    const value = file?.data;
    if (!value) return;
    await fetch("http://localhost:4000/json/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, value }),
    });
  }, [file, id]);

  useEffect(() => {
    if (!connected) return;
    window.addEventListener("mousemove", sendMousePosition);
  }, [connected, sendMousePosition]);
  return (
    <>
      <Container id="json">
        <h1>JSON Playground</h1>
        <JSONEditor value={file?.data} onChange={handleChangeJson} />
        <StyledButton variant="contained" onClick={handleOnSave}>
          Save
        </StyledButton>
      </Container>
    </>
  );
});

export default HomePage;

const StyledButton = styled(Button)`
  width: 120px;
  height: 35px;
  margin: 10px;
  background: ${theme.palette.grey[400]};
  border: 3px outset;
  box-shadow: 2px 2px 3px black;
  font-size: 15px;
`;

const Container = styled.div`
  padding: 20px;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  button {
    width: 153px;
  }

  .je-object-editor {
    background: ${theme.palette.text.primary};
    .je-expander {
      background: ${theme.palette.warning.dark};
    }
  }

  .mousePosition {
    position: absolute;
    width: 100px;
    min-height: 20px;
    background-color: ${theme.palette.warning.light};
    color: ${theme.palette.text.primary};
    font-weight: 500;
    padding: 4px;
  }
`;
