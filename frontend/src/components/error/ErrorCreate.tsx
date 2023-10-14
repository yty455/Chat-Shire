import React, { useState, useEffect, useRef } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { Input } from "antd";
import MultiSelect from "./MultiSelect";
import { Theme, useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Autocomplete, {
  createFilterOptions,
  AutocompleteChangeReason, // 추가
  AutocompleteChangeDetails, // 추가
} from "@mui/material/Autocomplete"; // import here
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Button } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import { postError } from "../../utils/errorApi";
import AWS from "aws-sdk";

interface ErrorProps {
  pjtId: string;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

type FileInfo = {
  url: string;
  thumbnail: string;
};

const { TextArea } = Input;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "python",
  "java",
  "javascript",
  "html5",
  "css3",
  "c",
  "c++",
  "r",
  "flutter",
  "dart",
  "kotlin",
  "pwa",
  "php",
  "django",
  "spring",
  "vue", 
  "react",
  "next",
  "node",
  "angular",
  "jenkins",
  "docker",
  "aws",
  "kubernetes",
  "three",
  "aframe",
  "unity",
  "unreal",
  "tomcat",
  "spark",
  "hadoop",
  "git"
];

const CustomChip = styled(Chip)(({ theme }) => ({
  fontFamily: "preRg",
  "&.python": {
    backgroundColor: "#F08484",
  },
  "&.java": {
    backgroundColor: "#F9A686",
  },
  "&.javascript": {
    backgroundColor: "#8ED2CD",
  },
  "&.html5": {
    backgroundColor: "#E1F5A9",
  },
  "&.css3": {
    backgroundColor: "#FBF6A4",
  },
  "&.c": {
    backgroundColor: "#F7819F",
  },
  "&.c++": {
    backgroundColor: "#D358F7",
  },
  "&.r": {
    backgroundColor: "#819FF7",
  },
  "&.flutter": {
    backgroundColor: "#F5A9A9",
  },
  "&.dart": {
    backgroundColor: "#F5F6CE",
  },
  "&.kotlin": {
    backgroundColor: "#FAAC58",
  },
  "&.pwa": {
    backgroundColor: "#FE2E64",
  },
  "&.php": {
    backgroundColor: "#A9F5F2",
  },
  "&.django": {
    backgroundColor: "#04B486",
  },
  "&.spring": {
    backgroundColor: "F5A9F2",
  },
  "&.vue": {
    backgroundColor: "#04B486",
  },
  "&.react": {
    backgroundColor: "#30BA96",
  },
  "&.next": {
    backgroundColor: "#789CCE",
  },
  "&.node": {
    backgroundColor: "#9E7EB9",
  },
  "&.angular": {
    backgroundColor: "#EF404A",
  },
  "&.jenkins": {
    backgroundColor: "#8ED2CD",
  },
  "&.docker": {
    backgroundColor: "#0431B4",
  },
  "&.aws": {
    backgroundColor: "#DF01D7",
  },
  "&.kubernetes": {
    backgroundColor: "#FA5858",
  },
  "&.three": {
    backgroundColor: "#58FA58",
  },
  "&.aframe": {
    backgroundColor: "#AC58FA",
  },
  "&.unity": {
    backgroundColor: "#F8E0F7",
  },
  "&.unreal": {
    backgroundColor: "#F3F781",
  },
  "&.tomcat": {
    backgroundColor: "#7401DF",
  },
  "&.spark": {
    backgroundColor: "#CECEF6",
  },
  "&.hadoop": {
    backgroundColor: "#8ED2CD",
  },
  "&.git": {
    backgroundColor: "#81F7BE",
  },
  height: "25px",
  "& .MuiChip-label": {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
}));

function getStyles(name: string, skillName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      skillName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function ErrorCreate({ pjtId, setIsCreating }: ErrorProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [imageSrc, setImageSrc]: any = useState(null);
  const [imageFile, setImageFile]: any = useState(null);
  const inputRef = useRef<any[]>([]);
  const [attachedFileInfos, setAttachedFileInfos] = useState<FileInfo[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ fontFamily: "preBd", marginTop: 8 }}>업로드</div>
    </div>
  );

  const reload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const theme = useTheme();
  const [skillName, setSkillName] = React.useState<string[]>([]);
  const filter = createFilterOptions<string>();

  // 에러 등록
  const postInError = async () => {
    console.log(pjtId, title, content, skillName, attachedFileInfos);
    try {
      const response = await postError(pjtId, title, content, skillName, attachedFileInfos);
      console.log(response);
      setIsCreating(false);
    } catch (error) {
      console.error(error);
    }
  };

  // s3에 이미지 업로드
  const uploadS3 = (file: File): Promise<string> => { 
    const REGION = process.env.REACT_APP_REGION;
    const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

    AWS.config.update({
      region: REGION,
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    const uploadPromise = new AWS.S3.ManagedUpload({
      params: {
        ACL: "public-read",
        Bucket: "chat-shire",
        Key:`error/${file.name}`,
        Body : file,
      }}).promise()
      return uploadPromise.then(() => 
        `https://chat-shire.s3.amazonaws.com/error/${file.name}`
      );
  };

  // 파일 선택 시 바로 업로드
  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const fileList = Array.from(e.target.files || []).map((file) =>
      ({ originFileObj: file } as UploadFile)
    );
  
    const attachedFileInfos: FileInfo[] = [];
  
    for (let file of fileList) {
      if (!file.url && !file.preview && file.originFileObj) {
        const url = await uploadS3(file.originFileObj);
        file.url = url;
        file.preview = url;
      }
  
      if (file.url) {
        attachedFileInfos.push({ url: file.url, thumbnail: "" });
        console.log('첨부한 이미지 url', attachedFileInfos);
      } else {
        console.error('undefined');
      }
    }
    console.log('첨부한 이미지 url', attachedFileInfos);
  
    setAttachedFileInfos(attachedFileInfos);
    setFileList(fileList);
  };

  return (
    <div>
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <p style={{ margin: 0, marginRight: "20px", fontFamily: "preRg" }}>
          제목
        </p>
        <Input
          style={{ width: "1100px", height: "40px" }}
          showCount
          maxLength={50}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <p style={{ margin: 0, marginRight: "20px", fontFamily: "preRg" }}>
          언어
        </p>
        <Autocomplete
          forcePopupIcon={false}
          multiple
          id="custom-input-demo"
          options={names}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue === "") {
              return [];
            }

            return filtered as string[];
          }}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "preRg",
                  color: "#adb5bd",
                  margin: "-6px 0 0 1px",
                  zIndex: "200",
                },
              }}
              label="언어를 검색하세요"
            />
          )}
          sx={{
            width: "300px",
            "& .MuiAutocomplete-tag": {
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
            "& .MuiAutocomplete-tagArea": {
              flexWrap: "nowrap",
              overflowX: "auto",
            },
            "& .MuiInputBase-root": {
              width: "1100px",
              padding: "2px 5px",
              fontFamily: "preBd",
              backgroundColor: "#ffffff",
              zIndex: "100",
            },
          }}
          renderTags={(selectedValues, getTagProps) =>
            selectedValues.map((option, index) => (
              <CustomChip
                {...getTagProps({ index })}
                key={index}
                label={option}
                className={option}
                sx={{ margin: "4px 4px" }}
              />
            ))
          }
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <CustomChip
                label={option}
                className={option}
                color={selected ? "primary" : undefined}
              />
            </li>
          )}
          onChange={(event, value) => {
            setSkillName([...value]);
            console.log(skillName);
          }}
        />
      </div>

      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <p style={{ margin: 0, marginRight: "20px", fontFamily: "preRg" }}>
          내용
        </p>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "1100px", height: 170, resize: "none" }}
          rows={8}
        />
      </div>

      <div style={{marginTop: '20px', display:'flex',alignItems:'center'}}>
      <p style={{ margin: "0 10px 10px 0", fontFamily: "preRg" }}>첨부파일</p>
      <input
        style={{marginTop:'-10px', fontFamily:'preRg'}}
        // hidden
        accept="image/*, video/*"
        multiple
        type="file"
        ref={(el) => (inputRef.current[0] = el)}
        // onChange={(e) => {
        //   onUploadImage(e).then(() => {
        //     if (!imageSrc) {
        //       window.alert("이미지를 등록해 주세요.");
        //       return;
        //     }
        //   });
        // }
        onChange={handleFileSelect}
        
      /></div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'start', height: "134px"}}>
        {attachedFileInfos.map((info, index) => (
          <img style={{padding: '10px', marginRight: '5px', border: '1px dashed grey', borderRadius: '10px', height: '100px'}} key={index} src={info.url} alt="Preview" />
        ))}
      </div>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>

      <Button
        style={{
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          fontSize: "17px",
          width: "100px",
          height: "40px",
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          color: "white",
          backgroundColor: "#39A789",
          fontFamily: "preBd",
        }}
        onClick={postInError}
        shape="round"
      >
        작성하기
      </Button>
    </div>
  );
}

export default ErrorCreate;
