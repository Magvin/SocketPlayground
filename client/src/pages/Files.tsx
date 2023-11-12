import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context";
import { IFile } from "../stores/user";

const FilesPage = () => {
  const [value, setValue] = useState<IFile[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const { store } = useAppContext();

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/json")
      .then((res) => res.json())
      .finally(() => {
        setLoading(false);
      });
    setValue(response);
  }, []);

  const handleOnClick = (arg: IFile) => {
    store.user.selectedFiles(arg);
    navigation(`/playground/${arg.id}`);
  };

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <Container className="documents windows-box-shadow">
      <div className="header">
        <label htmlFor="windows-documents-input-on-top">Documents</label>
      </div>
      {value.map((file) => (
        <button
          className="content white"
          onClick={() => handleOnClick(file)}
          key={file.id}
        >
          <div className="file">
            <span className="image">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiBhoALTAhTzgxAAAAhUlEQVRIx+1TQQ6AIAwrxIfxtD2Nn9WDOCCKmXAQjT0MQrOmHQDsIGiuBfy2CAmxV9YiEJIgjVUIRpXwGIQK0FzDucCwg14seeuK43rIDkwsrwSOZMm0WJMDYwR7U4mX3MLcM2hEaKHzIf0OZnfwgb/wvIPhISbfwmBuCYgI2pmD30ugfSuWrXYCzH4wigAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNi0yNlQwMDo0NTo0OC0wNDowMGElB+4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDYtMjZUMDA6NDU6NDgtMDQ6MDAQeL9SAAAAAElFTkSuQmCC"
                alt=""
              />
            </span>
            <span className="text">{file.title}.json</span>
          </div>
        </button>
      ))}
    </Container>
  );
};

export default FilesPage;

const Container = styled.div`
  background: #b9b9b9;
  margin: 0.5rem;
  margin-top: -5rem;
  z-index: 999999;
  resize: both;
  overflow: hidden;
  position: relative;
  width: 20rem;
  min-height: 21rem;
  &.documents {
    width: 50%;
    min-width: 50%;
    margin-top: 0;
    top: 14rem;
    height: 20rem;
    min-height: 20rem;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;

    .header {
      background: linear-gradient(90deg, #000b7c, #377cc6);
      color: white;
      padding: 0.25rem;
    }
  }
  &.windows-box-shadow {
    box-shadow: -2px -2px #e0dede, -2px 0 #e0dede, 0 -2px #e0dede,
      -4px -4px white, -4px 0 white, 0 -4px white, 2px 2px #818181,
      0 2px #818181, 2px 0 #818181, 2px -2px #e0dede, -2px 2px #818181,
      -4px 2px white, -4px 4px black, 4px 4px black, 4px 0 black, 0 4px black,
      2px -4px white, 4px -4px black;
  }
  .content {
    position: relative;
    float: left;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    .file {
      cursor: pointer;
      margin: 0 1rem 0 0;
      text-align: center;
      min-width: 6rem;
      height: 6rem;
      padding: 12px;
    }

    .file .image {
      display: block;
      width: 100%;
      text-align: center;
      margin: 0 0 1rem 0;
    }
    .file .text {
      word-break: break-all;
      padding: 2px;
    }
  }
`;
