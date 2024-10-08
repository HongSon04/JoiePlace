// "use client";

// import { Button } from "@nextui-org/react";
// import { useCallback, useRef, useState } from "react";
// import { twMerge } from "tailwind-merge";

// const isAllFiles = (dt) =>
//   dt.types.every((t) => t === "Files" || t === "application/x-moz-file");
// const doesAccept = (type, accept) => {
//   if (!accept) {
//     return true;
//   }

//   const acceptList = accept.split(",").map((c) => c.trim());
//   let cond = false;
//   for (const acceptor of acceptList) {
//     if (acceptor.endsWith("*")) {
//       cond ||= type.startsWith(acceptor.slice(0, -1));
//     } else {
//       cond ||= type === acceptor;
//     }
//   }
//   return cond;
// };
// const isEventAllowed = (e, accept, multiple) => {
//   if (!isAllFiles(e.dataTransfer)) {
//     return false;
//   }

//   const items = Array.from(e.dataTransfer.items);
//   if (items.length === 0 || (!multiple && items.length > 1)) {
//     return false;
//   }
//   return items.every((c) => doesAccept(c.type, accept));
// };

// export default function FileUploadButton({
//   accept,
//   onUpload,
//   acceptProps = { color: "primary" },
//   rejectProps = { color: "danger" },
//   multiple = false,
//   classNames,
//   className,
//   ...props
// }) {
//   const inputRef = useRef(null);
//   const [acceptance, setAcceptance] = useState(null);
//   const onDragEnter = useCallback(
//     (e) => {
//       if (isEventAllowed(e, accept, multiple)) {
//         setAcceptance("ACCEPT");
//       } else {
//         setAcceptance("REJECT");
//       }
//     },
//     [accept, multiple, setAcceptance]
//   );
//   const onDragOver = useCallback(
//     (e) => {
//       e.preventDefault();
//       if (isEventAllowed(e, accept, multiple)) {
//         setAcceptance("ACCEPT");
//       } else {
//         setAcceptance("REJECT");
//       }
//     },
//     [accept, multiple, setAcceptance]
//   );
//   const onDragFinish = useCallback(
//     (e) => {
//       setAcceptance(null);
//     },
//     [setAcceptance]
//   );
//   const onDrop = useCallback(
//     (e) => {
//       e.preventDefault();
//       e.persist();
//       e.stopPropagation();

//       if (isEventAllowed(e, accept, multiple)) {
//         const items = Array.from(e.dataTransfer.items);
//         if (items.length) {
//           onUpload?.(items.map((c) => c.getAsFile()));
//         }
//       }

//       setAcceptance(null);
//     },
//     [accept, multiple, onUpload, setAcceptance]
//   );
//   const onFileChosen = useCallback(
//     (e) => {
//       onUpload?.(Array.from(e.target.files));
//     },
//     [onUpload]
//   );
//   const onButtonPress = useCallback(() => {
//     inputRef.current?.click();
//   }, [inputRef]);

//   return (
//     <form className={classNames?.wrapper}>
//       <label htmlFor="_upload">
//         <Button
//           {...props}
//           {...(acceptance === "ACCEPT"
//             ? acceptProps
//             : acceptance === "REJECT"
//             ? rejectProps
//             : {})}
//           className={twMerge(
//             className,
//             classNames?.button,
//             acceptance === "ACCEPT"
//               ? acceptProps?.className
//               : acceptance === "REJECT"
//               ? rejectProps?.className
//               : null
//           )}
//           onPress={onButtonPress}
//           onDragEnter={onDragEnter}
//           onDragOver={onDragOver}
//           onDragEnd={onDragFinish}
//           onDragLeave={onDragFinish}
//           onDrop={onDrop}
//         />
//       </label>
//       <input
//         type="file"
//         role="presentation"
//         name="_upload"
//         ref={inputRef}
//         onChange={onFileChosen}
//         accept={accept}
//         multiple={multiple}
//         className="hidden"
//       />
//     </form>
//   );
// }

"use client";

import { Button } from "@nextui-org/react";
import { useCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const isAllFiles = (dt) =>
  dt.types.every((t) => t === "Files" || t === "application/x-moz-file");
const doesAccept = (type, accept) => {
  if (!accept) {
    return true;
  }

  const acceptList = accept.split(",").map((c) => c.trim());
  let cond = false;
  for (const acceptor of acceptList) {
    if (acceptor.endsWith("*")) {
      cond ||= type.startsWith(acceptor.slice(0, -1));
    } else {
      cond ||= type === acceptor;
    }
  }
  return cond;
};
const isEventAllowed = (e, accept, multiple) => {
  if (!isAllFiles(e.dataTransfer)) {
    return false;
  }

  const items = Array.from(e.dataTransfer.items);
  if (items.length === 0 || (!multiple && items.length > 1)) {
    return false;
  }
  return items.every((c) => doesAccept(c.type, accept));
};

export default function FileUploadButton({
  accept,
  onUpload,
  acceptProps = { color: "primary" },
  rejectProps = { color: "danger" },
  multiple = false,
  classNames,
  className,
  children,
  ...props
}) {
  const inputRef = useRef(null);
  const [acceptance, setAcceptance] = useState(null);
  const onDragEnter = useCallback(
    (e) => {
      if (isEventAllowed(e, accept, multiple)) {
        setAcceptance("ACCEPT");
      } else {
        setAcceptance("REJECT");
      }
    },
    [accept, multiple, setAcceptance]
  );
  const onDragOver = useCallback(
    (e) => {
      e.preventDefault();
      if (isEventAllowed(e, accept, multiple)) {
        setAcceptance("ACCEPT");
      } else {
        setAcceptance("REJECT");
      }
    },
    [accept, multiple, setAcceptance]
  );
  const onDragFinish = useCallback(
    (e) => {
      setAcceptance(null);
    },
    [setAcceptance]
  );
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.persist();
      e.stopPropagation();

      if (isEventAllowed(e, accept, multiple)) {
        const items = Array.from(e.dataTransfer.items);
        if (items.length) {
          onUpload?.(items.map((c) => c.getAsFile()));
        }
      }

      setAcceptance(null);
    },
    [accept, multiple, onUpload, setAcceptance]
  );
  const onFileChosen = useCallback(
    (e) => {
      onUpload?.(Array.from(e.target.files));
    },
    [onUpload]
  );
  const onButtonPress = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  return (
    <div
      className={twMerge(
        className,
        classNames?.wrapper,
        acceptance === "ACCEPT"
          ? acceptProps?.className
          : acceptance === "REJECT"
          ? rejectProps?.className
          : null
      )}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragEnd={onDragFinish}
      onDragLeave={onDragFinish}
      onDrop={onDrop}
      onClick={onButtonPress}
      {...props}
    >
      {children}
      <input
        type="file"
        role="presentation"
        name="_upload"
        ref={inputRef}
        onChange={onFileChosen}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />
    </div>
  );
}
