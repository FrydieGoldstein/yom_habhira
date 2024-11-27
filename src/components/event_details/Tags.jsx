import React, { useContext } from "react";
import { Button } from "@mui/material";
import { EventContext } from "../../contexts/EventContext";
import { useLanguage } from "../../contexts/LanguageContext";

const Tags = ({ eventId }) => {
  const { events } = useContext(EventContext);
  const event = events.find((e) => e.id === eventId);
  const { lang } = useLanguage();

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      {event.tags.map((tag, index) => (
        <Button key={index} onClick={() => console.log("clicked")} data-testid={`topics-button-${tag.title.english}`}>
          {tag.title[lang]}
        </Button>
      ))}
    </div>
  );
};

export default Tags;

// import React, { useContext } from "react";
// import { Button } from "@mui/material";
// import { EventContext } from "../../contexts/EventContext";
// import { useLanguage } from "../../contexts/LanguageContext";

// const Tags = ({ eventId }) => {
//   const { events } = useContext(EventContext);
//   const event = events.find((e) => e.id === eventId);
//   const { lang } = useLanguage();

//   if (!event) {
//     return <div>Event not found</div>;
//   }

//   const tags = event.tags?.arrayValue?.values || [];

//   return (
//     <div>
//       {tags.map((tag, index) => {
//         const tagTitle = tag?.mapValue?.fields?.title?.mapValue?.fields?.[lang]?.stringValue || "Unknown Tag";
//         return (
//           <Button key={index} onClick={() => console.log("clicked")} data-testid={`topics-button-${tagTitle}`}>
//             {tagTitle}
//           </Button>
//         );
//       })}
//     </div>
//   );
// };

// export default Tags;
