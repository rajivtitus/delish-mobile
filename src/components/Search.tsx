import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";

import { Theme } from "../ts/types/theme";
import { useLocationContext } from "../context/LocationContext";

interface Props {
  placeholder?: string;
  icon?: string;
  style?: {};
}

const defaultPlaceholder = "Search for a location";

const Search = ({
  placeholder = defaultPlaceholder,
  icon,
  ...rest
}: Props): JSX.Element => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  const { keyword, search } = useLocationContext();
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => setSearchKeyword(keyword), [keyword]);

  return (
    <View style={styles.search}>
      <Searchbar
        icon={icon}
        placeholder={placeholder}
        value={searchKeyword}
        onSubmitEditing={() => search(searchKeyword)}
        onChangeText={(text) => setSearchKeyword(text)}
        {...rest}
      />
    </View>
  );
};

const makeStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    search: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
  });

export default Search;
