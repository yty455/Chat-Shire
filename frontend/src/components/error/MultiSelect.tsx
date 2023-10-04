import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Autocomplete, {
  createFilterOptions,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material/Autocomplete"; // import here
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";

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
interface searchProps {
  onSearch: (searchText: string) => void;
}
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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultiSelect({ onSearch }: searchProps) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  // const handleSearchClick = () => {
  //   if (personName.length > 0) {
  //     const selectedLanguage = personName[0];
  //     onSearch(selectedLanguage);
  //   }
  // };

  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  //   console.log(personName);
  //   if (personName.length > 0) {
  //     const selectedLanguage = personName[0];
  //     onSearch(selectedLanguage);
  //   }
  // };

  const handleChange = (
    event: React.SyntheticEvent,
    value: readonly string[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ) => {
    setPersonName(value as string[]);
    // console.log("선택된 기술 스택:", value);
    onSearch(value[0]);
  };

  const filter = createFilterOptions<string>();

  return (
    <Autocomplete
      forcePopupIcon={false}
      multiple
      id="custom-input-demo"
      options={names}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        // At the opening of dropdown (when search is empty), no options will be shown.
        if (params.inputValue === "") {
          return [];
        }

        return filtered as string[];
      }}
      getOptionLabel={(option) => option}
      value={personName}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            "& .MuiInputLabel-root": {
              fontFamily: "preRg",
              color: "#adb5bd",
              margin: "-16px 0 0 1px",
              zIndex: "200",
            },
            "& .MuiInputBase-root": {
              marginTop: "-10px",
              boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%)",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#e9ecef",
                border: "1px solid #e9ecef",
                borderTop: "1px solid #f8f9fa",
              },
              "&:hover fieldset": {
                borderColor: "#e9ecef",
                border: "1px solid #e9ecef",
                borderTop: "1px solid #f8f9fa",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#e9ecef",
                border: "1px solid #e9ecef",
                borderTop: "1px solid #f8f9fa",
              },
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
          position: "fixed",
          width: "300px",
          padding: "2px 5px",
          fontFamily: "preBd",
          backgroundColor: "#ffffff",
          zIndex: "100",
        },
        marginLeft: "10px",
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
    />
  );
}

export default MultiSelect;
