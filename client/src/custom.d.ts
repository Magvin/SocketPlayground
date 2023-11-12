declare module "reactjs-json-editor" {
  interface ReactJsonEditorProps {
    value?: { [key: string]: string };
    onChange: (event: any) => void;
  }
  export class JSONEditor extends React.Component<ReactJsonEditorProps> {}
}
