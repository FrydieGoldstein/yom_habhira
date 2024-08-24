import React, { useContext } from "react";
import { TagsContext } from "../contexts/TagsContext";
import { Button, Box } from "@mui/material";

const TagsFilterDrawer = ({ onTagsChange, selectedTags }) => {
  const { tags } = useContext(TagsContext);
  const handleToggle = (tagId) => {
    const newSelectedTags = selectedTags.includes(tagId) ? selectedTags.filter((id) => id !== tagId) : [...selectedTags, tagId];
    onTagsChange(newSelectedTags);
  };

  return (
    <Box sx={{ width: "auto", padding: 2 }}>
      {tags.map((tag) => (
        <Button
          key={tag.id}
          onClick={() => handleToggle(tag.id)}
          variant="outlined"
          sx={{
            margin: 1,
            backgroundColor: selectedTags.includes(tag.id) ? "secondary.main" : "inherit",
            color: selectedTags.includes(tag.id) ? "white" : "inherit",
            "&:hover": {
              backgroundColor: selectedTags.includes(tag.id) ? "secondary.main" : "inherit",
            },
          }}
        >
          {tag.title.hebrew}
        </Button>
      ))}
    </Box>
  );
};

export default TagsFilterDrawer;