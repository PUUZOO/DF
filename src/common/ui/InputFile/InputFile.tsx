import React, { ReactElement } from "react";
import classNames from "classnames";
import Button from "@/ui/Button";

interface FilesDragAndDropProps {
  onUpload: (files: File[]) => void;
  children: React.ReactElement | React.ReactElement[];
  count?: number;
  formats?: string[];
  openDialogOnClick?: boolean;
  hoverText?: (({ count, formats }: { count?: number; formats?: string[] }) => string) | string;
  successText?: (({ files }: { files: File[] }) => string) | string;
  errorCountText?: (({ count }: { count?: number }) => string) | string;
  errorFormatText?: (({ formats }: { formats?: string[] }) => string) | string;
  className?: string;
  containerStyles?: React.CSSProperties;
  hoverMessageStyles?: React.CSSProperties;
  successMessageStyles?: React.CSSProperties;
  errorMessageStyles?: React.CSSProperties;
  successTime?: number;
  errorTime?: number;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
  onDrop?: (files: File[]) => void;
  disabled?: boolean;
}

const InputFile = ({
  onUpload,
  children,
  count = 1,
  formats,
  openDialogOnClick = true,
  hoverText = "Перетащите сюда файлы",
  successText = "Загружаются",
  errorCountText = ({ count }) => `Вы можете загрузить только ${count} файла(ов)`,
  errorFormatText = ({ formats }) => `Можно загружать только: ${formats && formats.join(", ")}`,
  className,
  containerStyles = { height: "250px" },
  hoverMessageStyles = {},
  successMessageStyles = {},
  errorMessageStyles = {},
  successTime = 1000,
  errorTime = 2000,
  onDragEnter,
  onDragLeave,
  onDrop,
  disabled,
}: FilesDragAndDropProps): ReactElement => {
  const [dragging, setDragging] = React.useState(false);
  interface MessageProps {
    show: boolean;
    text: string | null;
    type: string | null;
  }
  const [message, setMessage] = React.useState<MessageProps>({
    show: false,
    text: null,
    type: null,
  });

  const drag = React.useRef(null);
  const drop = React.useRef<HTMLInputElement>(null);
  const input = React.useRef(null);

  React.useEffect(() => {
    // TODO не уверен что решение нормальное
    if (!disabled) {
      drop.current?.addEventListener("dragover", handleDragOver);
      drop.current?.addEventListener("drop", handleDrop);
      drop.current?.addEventListener("dragenter", handleDragEnter);
      drop.current?.addEventListener("dragleave", handleDragLeave);
    }
    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver);
      drop.current?.removeEventListener("drop", handleDrop);
      drop.current?.removeEventListener("dragenter", handleDragEnter);
      drop.current?.removeEventListener("dragleave", handleDragLeave);
    };
  }, [disabled]);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const files = e.dataTransfer ? [...e.dataTransfer.files] : [];

    onDrop && onDrop(files);

    handleUpload(files);
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target !== drag.current) {
      setDragging(true);

      onDragEnter && onDragEnter();
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === drag.current) {
      setDragging(false);

      onDragLeave && onDragLeave();
    }
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = [...e.target.files];

      handleUpload(files);
    }
  };

  const handleUpload = (files: File[]) => {
    if (count && count < files.length) {
      showMessage(
        typeof errorCountText === "function" ? errorCountText({ count }) : errorCountText,
        "error",
        errorTime,
      );

      return;
    }

    if (
      formats &&
      files.some(
        (file: File) =>
          !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())),
      )
    ) {
      showMessage(
        typeof errorFormatText === "function" ? errorFormatText({ formats }) : errorFormatText,
        "error",
        errorTime,
      );

      return;
    }

    if (files && files.length) {
      showMessage(
        typeof successText === "function" ? successText({ files }) : successText,
        "success",
        successTime,
      );

      onUpload(files);
    }
  };

  const showMessage = (text: string, type: string, timeout: number) => {
    setMessage({
      show: true,
      text,
      type,
    });

    setTimeout(
      () =>
        setMessage({
          show: false,
          text: null,
          type: null,
        }),
      timeout,
    );
  };

  const openFileDialog = () => {
    // @ts-ignore
    input && input.current.click();
  };

  return (
    <div
      ref={drop}
      className={classNames(
        "d-flex flex-column align-items-center justify-content-center position-relative",
        className,
      )}
      style={{
        ...styles.container,
        cursor: openDialogOnClick ? "pointer" : "default",
        ...containerStyles,
      }}
      onClick={disabled ? undefined : openDialogOnClick ? openFileDialog : undefined}
    >
      {openDialogOnClick && (
        <input
          ref={input}
          type='file'
          style={{ ...styles.input }}
          accept={formats ? formats.map((format) => `.${format}`).join(", ") : undefined}
          multiple={!count || count > 1}
          onChange={(e) => {
            if (!disabled) handleSelectFiles(e);
          }}
        />
      )}
      {message.show && (
        <div
          style={{
            ...styles.message,
            ...(message.type === "success" && styles.messageSuccess),
            ...(message.type === "error" && styles.messageError),
            ...hoverMessageStyles,
            ...(message.type === "success" && successMessageStyles),
            ...(message.type === "error" && errorMessageStyles),
          }}
        >
          {message.text}
        </div>
      )}
      {dragging && (
        <div
          ref={drag}
          style={{
            ...styles.message,
            ...hoverMessageStyles,
          }}
        >
          {typeof hoverText === "function" ? hoverText({ formats, count }) : hoverText}
        </div>
      )}
      {children}
      {openDialogOnClick && (
        <Button className='mt-8' variant='info' disabled={disabled}>
          Загрузить
        </Button>
      )}
    </div>
  );
};

export default InputFile;

const styles: {
  container: React.CSSProperties;
  input: React.CSSProperties;
  message: React.CSSProperties;
  messageSuccess: React.CSSProperties;
  messageError: React.CSSProperties;
} = {
  container: {
    border: "1px dashed #BAC5CF",
    borderRadius: "12px",
  },
  input: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "1px",
    height: "1px",
    opacity: "0",
    cursor: "default",
  },
  message: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    width: "100%",
    height: "100%",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column nowrap",
    backgroundColor: "#e7e7e7",
    color: "#7f8e99",
    fontSize: "16px",
    opacity: "1",
    textAlign: "center",
  },
  messageSuccess: {
    backgroundColor: "#e7f7e7",
    color: "#667482",
  },
  messageError: {
    backgroundColor: "#f7e7e7",
    color: "#667482",
  },
};
