import React, { useEffect, useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs"
import { Input } from 'antd';
import MultiSelect from "./MultiSelect";
import { Theme, useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'; // import here
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import Paper from "@mui/material/Paper";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Button } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import axios from 'axios';

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
  "c#",
  "docker",
  "curl",
  "three.js",
  "react",
  "c++",
  "clang",
  "jenkins",
];

const CustomChip = styled(Chip)(({ theme }) => ({
  fontFamily: 'preRg',
  '&.python': {
    backgroundColor: '#F08484',
  },
  '&.java': {
    backgroundColor: '#F9A686'
  },
  '&.c#': {
    backgroundColor: '#FBF6A4',
  },
  '&.docker': {
    backgroundColor: 'F9BF64',
  },
  '&.curl': {
    backgroundColor: '#A0D6B6',
  },
  '&.three.js': {
    backgroundColor: '#30BA96',
  },
  '&.react': {
    backgroundColor: '#789CCE',
  },
  '&.c++': {
    backgroundColor: '#9E7EB9',
  },
  '&.clang': {
    backgroundColor: '#EF404A',
  },
  '&.jenkins': {
    backgroundColor: '#8ED2CD',
  },
  height: '25px',
  '& .MuiChip-label': {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
}));

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function ErrorCreate() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [content, setContent] = useState('');


  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChangePic: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ fontFamily:'preBd', marginTop: 8 }}>업로드</div>
    </div>
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  };

  const reload = () => {
    window.location.reload()
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const filter = createFilterOptions<string>();

  // 이미지 url 보내기
  const handleSendRequest = async () => {
    try {
      const response = await axios.post('url', { image: previewImage });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div> 
      {/* <div style={{display:'flex', alignItems:'center'}}>
        <BsArrowLeftCircle onClick={reload} style={{marginRight: '5px', color: 'grey', fontSize: '25px'}}/>
        <p style={{color: 'grey', margin: 0, fontFamily:'preBd',fontSize:'20px'}}>뒤로가기</p>
      </div> */}
      <div style={{marginTop: '20px', display:'flex',alignItems:'center'}}>
        <p style={{margin: 0, marginRight: '20px', fontFamily:'preRg'}}>제목</p>
        <Input style={{width: '1100px', height: '40px'}} showCount maxLength={50} onChange={onChange} />
      </div>
      
      
      <div style={{marginTop: '20px', display:'flex',alignItems:'center'}}>
        <p style={{margin: 0, marginRight: '20px', fontFamily:'preRg'}}>언어</p>
        <Autocomplete
          forcePopupIcon={false}
          multiple
          id="custom-input-demo"
          options={names}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue === '') {
                return [];
            }

            return filtered as string[];
          }}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
              <TextField {...params} sx={{
                '& .MuiInputLabel-root': {
                  fontFamily: 'preRg', 
                  color:'#adb5bd', 
                  margin: '-6px 0 0 1px', 
                  zIndex:'200',
                },
                '& .MuiInputBase-root': {
                  // marginTop: '-10px',
                  // margin: '10px 0 0 10px'
                },
              }} label="언어를 검색하세요" />
          )}
          sx={{ 
              width: '300px', 
              '& .MuiAutocomplete-tag': {
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
              },
              '& .MuiAutocomplete-tagArea': {
                  flexWrap: 'nowrap',
                  overflowX: 'auto',
              },
              '& .MuiInputBase-root': {
                width: "1100px",
                padding: '2px 5px',
                fontFamily: 'preBd',
                backgroundColor: "#ffffff",
                zIndex: "100",
              },
            }}

          renderTags={(selectedValues, getTagProps) =>
              selectedValues.map((option, index) => (
                  <CustomChip {...getTagProps({ index })} key={index} label={option} className={option} sx={{ margin: '4px 4px' }}/>
              ))
          }
          renderOption={(props, option, { selected }) => (
              <li {...props}>
                  <CustomChip label={option} className={option} color={selected ? 'primary' : undefined} />
              </li>
          )}
        />
      </div>

      <div style={{marginTop: '20px', display:'flex',alignItems:'center'}}>
        <p style={{margin: 0, marginRight: '20px', fontFamily:'preRg'}}>내용</p>
        <TextArea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              style={{ width: '1100px', height: 170, resize: 'none' }}  
              rows={8}/>
      </div>

      {/* <div style={{marginTop: '20px', display:'flex',alignItems:'center'}}> */}
        <p style={{margin: '20px 0 10px 0', fontFamily:'preRg'}}>첨부파일</p>
        <Upload
          // action="localhost:3000"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChangePic}
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              if (onSuccess) {
                onSuccess("ok");
              }
            }, 0);
          }}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      {/* </div> */}


      <Button style={{justifyContent:'center',textAlign:'center',alignItems:'center',fontSize:'17px', width: '100px', height: '40px', display:'flex', marginLeft: 'auto', marginRight:'auto', color: 'white', backgroundColor:'#39A789', fontFamily:'preBd'}} onClick={handleSendRequest} shape="round">
        작성하기
      </Button>
    </div>
  );
}

export default ErrorCreate;
