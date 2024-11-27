import { useState, useEffect, useContext } from "react";
import { EventContext } from "../contexts/EventContext";
import { FilterContext } from "../contexts/FilterContext";
import { useLanguage } from "../contexts/LanguageContext";
import { TimeSlot } from "../constants/enums";
import { en } from "../constants/En";

export const useEventFilters = () => {
  const { filters, setFilters } = useContext(FilterContext);
  const { events } = useContext(EventContext);
  const { translations, lang } = useLanguage();
  const [tempFilters, setTempFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleSearch = (query) => {
    setSearchQuery(query.target.value.toLowerCase());
  };

  const handleFilterChange = (filterType, value) => {
    setTempFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleSaveFilter = () => {
    setFilters((prev) => ({ ...prev, ...tempFilters }));
  };

  const handleClearFilter = (filterType) => {
    switch (filterType) {
      case translations.topics:
        setTempFilters((prev) => ({ ...prev, tags: [] }));
        break;
      case translations.time:
        setTempFilters((prev) => ({ ...prev, times: [] }));
        break;
      case translations.language:
        setTempFilters((prev) => ({ ...prev, languages: [] }));
        break;
      case translations.location:
        setTempFilters((prev) => ({ ...prev, location: [] }));
        break;
      default:
        break;
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");

    setTempFilters({
      tags: [],
      times: [],
      languages: [],
      location: [],
    });

    setFilters({
      tags: [],
      times: [],
      languages: [],
      location: [],
    });
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchQuery === "" ||
      event.title[lang].toLowerCase().includes(searchQuery) ||
      event.lecturer.name[lang].toLowerCase().includes(searchQuery) ||
      event.address.city[lang].toLowerCase().includes(searchQuery) ||
      event.address.street[lang].toLowerCase().includes(searchQuery) ||
      event.address.country[lang].toLowerCase().includes(searchQuery);

    const matchesTags = !filters.tags || filters.tags.length === 0 || event.tags.some((tag) => filters.tags.includes(tag.id));
    const matchesLangs = !filters.languages || filters.languages.length === 0 || filters.languages.includes(event.language);
    const matchesLocation =
      !filters.location ||
      filters.location.length === 0 ||
      filters.location.includes(event.address.city[lang]) ||
      filters.location.includes(event.address.country[lang]);

    const matchesTimes =
      !filters.times ||
      filters.times.length === 0 ||
      filters.times.some((time) => {
        const eventTime = new Date(event.startTime);
        const [day] = time.split(/(?=[A-Z])/);
        const [startHour, startMinute] = TimeSlot[time].split(" - ")[0].split(":").map(Number);
        const [endHour, endMinute] = TimeSlot[time].split(" - ")[1].split(":").map(Number);

        if (day === en.friday.toLowerCase() && eventTime.getDay() === 5) {
          const startTime = new Date(eventTime);
          startTime.setHours(startHour, startMinute, 0);

          const endTime = new Date(eventTime);
          endTime.setHours(endHour, endMinute, 0);

          return eventTime >= startTime && eventTime <= endTime;
        }

        if (day === en.saturday.toLowerCase() && eventTime.getDay() === 6) {
          const startTime = new Date(eventTime);
          startTime.setHours(startHour, startMinute, 0);

          const endTime = new Date(eventTime);
          endTime.setHours(endHour, endMinute, 0);

          return eventTime >= startTime && eventTime <= endTime;
        }

        return false;
      });

    return matchesSearch && matchesTags && matchesLangs && matchesLocation && matchesTimes;
  });

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
    tempFilters,
    setTempFilters,
    handleFilterChange,
    handleSaveFilter,
    handleClearFilter,
    filteredEvents,
    handleResetFilters,
  };
};
