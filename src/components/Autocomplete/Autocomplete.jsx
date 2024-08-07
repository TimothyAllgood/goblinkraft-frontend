import React, { useEffect, useState, useRef } from "react";
import AutocompleteOption from "./AutocompleteOption/AutocompleteOption";
import "./Autocomplete.css";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Autocomplete({
  label,
  service,
  searchOptions,
  setValue,
  clearAfter = true,
  backgroundColor = "var(--card-background)",
  randomize = false,
}) {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [refetch, setRefetch] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const optionsRef = useRef(null);

  const fetchOptions = async () => {
    const response = await service.getAutocomplete(search);
    setOptions(response);
  };

  const adjustHeightIfNeeded = (element) => {
    const rect = element.getBoundingClientRect();
    if (rect.bottom >= window.innerHeight) {
      const maxHeight = window.innerHeight - rect.top - 10; // 10px padding from the bottom
      element.style.bottom = `${inputRef.current.offsetHeight + 25}px`;
      element.style.top = "initial";
    } else {
      element.style.bottom = ""; // Reset maxHeight if not touching bottom
      element.style.top = "100%";
    }
  };

  useEffect(() => {
    if (optionsRef.current) {
      adjustHeightIfNeeded(optionsRef.current);
    }
  }, [options]);

  useEffect(() => {
    if (search.length >= 2 && refetch) {
      const debounceFetch = setTimeout(() => {
        if (service) {
          fetchOptions();
        } else {
          const filteredOptions = searchOptions.filter((option) =>
            option.name.toLowerCase().includes(search.toLowerCase())
          );
          setOptions(filteredOptions);
        }
      }, 250);
      return () => clearTimeout(debounceFetch);
    }
  }, [search]);

  const handleClickOutside = (event) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      optionsRef.current &&
      !optionsRef.current.contains(event.target)
    ) {
      setSearch("");
      setOptions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    if (clearAfter) {
      setSearch("");
      setRefetch(true);
    } else {
      setSearch(option.name);
      setRefetch(false);
    }
    setValue(option.name);
    setOptions([]);
  };

  return (
    <div className="autocomplete-container">
      <div className="autocomplete-input-container">
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setRefetch(true);
          }}
          onFocus={() => {
            if (!service) {
              setOptions(searchOptions);
            }
            setIsFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setOptions([]);
            }, 200);
            setIsFocused(false);
          }}
          className={`autocomplete-input ${search ? "has-value" : ""}`}
        />
        <label
          className={`autocomplete-label ${search ? "active" : ""}`}
          style={{
            backgroundColor: (search || isFocused) && backgroundColor,
          }}
        >
          {label}
        </label>
        {randomize && (
          <span
            className="randomize-button"
            onClick={() => {
              const randomOption =
                searchOptions[Math.floor(Math.random() * searchOptions.length)];
              handleOptionClick(randomOption);
            }}
          >
            <FontAwesomeIcon icon={faShuffle} />
          </span>
        )}
      </div>
      {options.length > 0 && (
        <div ref={optionsRef} className="options">
          {options.map((option) => (
            <div key={option.id} onClick={() => handleOptionClick(option)}>
              <AutocompleteOption option={option} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
