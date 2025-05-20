import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAvatar from "../../components/Profile/hooks/use-avatar.hook";
import { Avatar, Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import * as collection from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { toast } from "react-toastify";
import useLocalStorage from "@rehooks/local-storage";
import { setAvatar } from "../../features/auth/dataSlice";

const AvatarPlayground = () => {
  const {avatarProps} = useSelector(state => state.data);
  const { user } = useSelector((state) => state.auth);

  const [avatarStyle, setAvatarStyle] = useState("identicon");
  const [seed, setSeed] = useState("");
  const [schema, setSchema] = useState({});
  const [customOptions, setCustomOptions] = useState({});
  const dispatch = useDispatch();

  const { updateUserAvatar } = useAvatar();

  const jsonBody = {
    dataUri: true,
    seed: user.id,
    ...customOptions
  }

  const avatar = createAvatar(collection[avatarStyle], jsonBody);

  const svgUri = avatar.toDataUri();

  const handleCustomOptionChange = (key, value) => {
    setCustomOptions((prev) => ({
      ...prev,
      [key]: [value],
    }))};

  const handleSave = () => {
    
    const props = {
      seed: seed || user.id,
      style: avatarStyle,
      customOptions: customOptions
    }
    dispatch(setAvatar(svgUri));
    updateUserAvatar(props);
    toast.success("Avatar saved successfully!")
  }

  const RenderField = ({fieldKey, fieldSchema, avatarStyle, customOptions, handleCustomOptionChange, seed}
  ) => {
    const [isDropdownOpen, setIsDropDownOpen] = useState(false);

    const options = fieldSchema.enum ||
    (fieldSchema.type === "array" && fieldSchema.items?.type === "string" ?
      fieldSchema.default || [] : []
    )

    if(!options ||options.length <= 1) return null;

    return (
      <FormControl sx={{ width: 300 }}>
        <InputLabel>{fieldKey}</InputLabel>
        <Select
          MenuProps={{
            disableScrollLock: true,
          }}
          label={fieldKey}
          value={customOptions[fieldKey] || options[0]}
          onChange={(e) => handleCustomOptionChange(fieldKey, e.target.value)}
          onOpen={() => setIsDropDownOpen(true)}
          onClose={() => setIsDropDownOpen(false)}
          renderValue={(selected) =>
            isDropdownOpen ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography>{selected}</Typography>
              </Box>
            ) : (
              selected
            )
          }
        >
          {options.map((option) => {
            const optionAvatar = createAvatar(collection[avatarStyle], {
              ...customOptions,
              seed: seed || user.id,
              [fieldKey]: [option],
              dataUri: true,
            }).toDataUri();

            return (
              <MenuItem
                key={option}
                value={option}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {fieldKey.toLowerCase().includes("color") ? (
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      bgcolor: `#${option.slice(0, 6)}`,
                      border: "1px solid #ccc",
                    }}
                  />
                ) : (
                  option
                )}
                {isDropdownOpen && (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      marginLeft: 2,
                    }}
                  >
                    <Avatar
                      src={optionAvatar}
                      alt={`Avatar for ${option}`}
                      sx={{ width: 40, height: 40 }}
                    />
                  </Box>
                )}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }

  useEffect(() => {
    const style = collection[avatarStyle];
    const styleSchema = style?.schema;
    if(avatarStyle !== 'identicon' && styleSchema?.properties){
      setSchema(styleSchema);
    }else {
      setSchema(null);
      setCustomOptions({});
    }
  }, [avatarStyle]);

  useEffect(() => {            
    if(avatarProps?.style) {
      setAvatarStyle(avatarProps.style);
      setSeed(avatarProps.seed);
      setCustomOptions(avatarProps.customOptions || {});
    }
  }, [avatarProps]);

    return (
      <Box sx={{ width: { sm: "100%", md: "70%" } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 2,
            alignItems: "start",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl variant="outlined" sx={{ width: 300 }}>
              <InputLabel>Avatar Style</InputLabel>
              <Select
                MenuProps={{
                  disableScrollLock: true,
                }}
                label="Avatar Style"
                value={avatarStyle}
                onChange={(e) => setAvatarStyle(e.target.value)}
              >
                {Object.keys(collection).map((styleKey) => (
                  <MenuItem key={styleKey} value={styleKey}>
                    {styleKey}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {schema?.properties && 
              Object.entries(schema.properties).map(([key, fieldSchema]) => (
                <RenderField 
                key={key}
                fieldKey={key}
                fieldSchema={fieldSchema}
                avatarStyle={avatarStyle}
                customOptions={customOptions}
                handleCustomOptionChange={handleCustomOptionChange}
                jsonBody={jsonBody} /> ))
            }
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                backgroundSize: "20px 20px",
                borderRadius: 1,
              }}
            >
              <Avatar
                src={svgUri}
                alt="Dicebear Avatar"
                sx={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={handleSave}>Save</Button>
        </Box>
      </Box>
    );
};

export default AvatarPlayground;
