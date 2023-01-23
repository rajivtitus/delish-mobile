import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";

import { Theme } from "../../../ts/types/theme";
import { useLocationContext } from "../../../context/LocationContext";

const Search = () => {
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  const { keyword, search } = useLocationContext();
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  return (
    <View style={styles.search}>
      <Searchbar
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => search(searchKeyword)}
        onChangeText={(text) => setSearchKeyword(text)}
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
