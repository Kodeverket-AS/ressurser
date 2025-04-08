import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Flex, Text, TextInput } from "@sanity/ui";
import { SearchIcon, TrashIcon } from "@sanity/icons";
import { set, useClient, useFormValue } from "sanity";

/*
This is the scema struc for this component
const Schema = {
  hidden: true,
  name: 'role2',
  title: 'Stilling',
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        { type: "string", name: "value" }
      ],
    }
  ],
  description: 'Du kan ligge til en eller flere stillinger',
  components: {
    input: AutocompleteTags
  },
} */

export default function AutocompleteTags(props) {
  const { id, elementProps, onChange, value = [] } = props;
  const [input, setInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  // Initiate client and get type / field when fetching related tags
  const client = useClient({ apiVersion: "2024-06-17" });
  const docType = useFormValue(["_type"]);
  const QUERY = `*[_type == '${docType}' && ${id} != null]{${id}}`;

  const handleInput = (string) => {
    // Update input
    setInput(string);

    // Clear suggestions on empty input
    if (string == null || string.length < 1) return setSuggestedTags([]);

    // Create suggestions based on input
    const results = availableTags.filter((tag) => tag.toLowerCase().includes(string.toLowerCase().trim()));
    setSuggestedTags(results.slice(0, 10));
  };

  const handleSelect = (string) => {
    if (string == null || string.length < 1) return;

    // Get selected tag and pass to tag update handler
    const tagName = string.toLowerCase().trim();
    const createTag = { _key: tagName, value: tagName };
    updateTags([...value, createTag]);

    // clear input
    setInput("");
    setSuggestedTags([]);
  };

  const handleKeydown = (event) => {
    // Trigger on enter press
    if (event.key !== "Enter") return;

    // Tag name
    const tagName = event.target.value.toLowerCase().trim();

    // Similar exists
    if (suggestedTags.includes(tagName)) {
      // todo
      return;
    }

    // create new if no suggestions exists
    if (suggestedTags.length < 1) {
      const tag = { value: tagName, _key: tagName };
      const newTags = [...value, tag];
      updateTags(newTags);
      setInput("");
    }
  };

  const removeTag = (index) => {
    const newTags = value.toSpliced(index, 1);
    updateTags(newTags);
  };

  const updateTags = useCallback(
    (newTags) => {
      if (!newTags) return;
      onChange(newTags.length > 0 ? set(newTags) : set([]));
    },
    [onChange]
  );

  const capitilize = (str) => {
    return str.length > 1 ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  };

  const fetchTags = useCallback(async () => {
    // Get raw data and flatten nesting to array
    const result = await client.fetch(QUERY);
    const trimmed = result
      .map((value) => value[id])
      .flat()
      .map((value) => value.value);

    // Remove duplicate tags and filter out existing
    const unique = [...new Set(trimmed)];
    const filtered = unique.filter((item) => !value.some((tag) => tag.value === item));

    setAvailableTags(filtered);
  }, [QUERY, client, id, value]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <Card style={{ position: "relative" }}>
      <Card border={1}>
        <Flex padding={1} gap={2} wrap={"wrap"}>
          {value &&
            value.map((tag, index) => (
              <Card key={index} height={"fill"} radius={2} tone="primary">
                <Flex padding={2} gap={2} align={"center"}>
                  <Text size={2}>{capitilize(tag.value)}</Text>
                  <Button icon={TrashIcon} mode="ghost" padding={0} radius={"full"} onClick={() => removeTag(index)} />
                </Flex>
              </Card>
            ))}
          <TextInput
            {...elementProps}
            fontSize={2}
            padding={2}
            border={0}
            height={"fill"}
            icon={SearchIcon}
            placeholder="Søk..."
            value={input}
            onChange={(event) => handleInput(event.currentTarget.value)}
            onKeyDown={(event) => handleKeydown(event)}
            autoComplete="off"
          />
        </Flex>
      </Card>
      {suggestedTags.length > 0 && (
        <Card border={1} style={{ position: "absolute", zIndex: 20, minHeight: 0, width: "calc(100% - 2px)" }}>
          <Flex direction={"column"}>
            {suggestedTags.map((tag, index) => (
              <Card as={"button"} key={index} padding={3} onClick={() => handleSelect(tag)}>
                <Text size={2}>{capitilize(tag)}</Text>
              </Card>
            ))}
          </Flex>
        </Card>
      )}
    </Card>
  );
}
