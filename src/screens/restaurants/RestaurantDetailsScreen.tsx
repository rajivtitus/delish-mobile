/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { List, Button, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { Theme } from "../../ts/types/theme";
import { RestaurantsStackScreenProps } from "../../ts/types/navigation";
import Layout from "../../components/Layout";
import RestaurantCard from "../../components/restaurants/RestaurantCard";
import Typography from "../../components/Typography";
import Spacer from "../../components/Spacer";

const RestaurantDetailsScreen = ({ route }: RestaurantsStackScreenProps) => {
  const restaurant = route.params?.restaurant;
  const [isBreakfastOpen, setIsBreakfastOpen] = useState<boolean>(false);
  const [isLunchOpen, setIsLunchOpen] = useState<boolean>(false);
  const [isDinnerOpen, setIsDinnerOpen] = useState<boolean>(false);
  const [isDrinksOpen, setIsDrinksOpen] = useState<boolean>(false);
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);
  const navigation = useNavigation();

  return (
    <Layout>
      <Spacer position="left" size="lg">
        <Button
          labelStyle={styles.mediumText}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          Back
        </Button>
      </Spacer>

      {restaurant ? (
        <>
          <RestaurantCard restaurant={restaurant} />
          <ScrollView>
            <List.Accordion
              title="Breakfast"
              left={(props) => <List.Icon {...props} icon="bread-slice" />}
              expanded={isBreakfastOpen}
              onPress={() =>
                setIsBreakfastOpen(
                  (prevIsBreakfastOpen) => !prevIsBreakfastOpen
                )
              }
              style={styles.accordion}
            >
              <List.Item title="Eggs Benedict" />
              <List.Item title="Classic Breakfast" />
            </List.Accordion>
            <List.Accordion
              title="Lunch"
              left={(props) => <List.Icon {...props} icon="hamburger" />}
              expanded={isLunchOpen}
              onPress={() =>
                setIsLunchOpen((prevIsLunchOpen) => !prevIsLunchOpen)
              }
              style={styles.accordion}
            >
              <List.Item title="Burger w/ Fries" />
              <List.Item title="Steak Sandwich" />
              <List.Item title="Mushroom Soup" />
            </List.Accordion>
            <List.Accordion
              title="Dinner"
              left={(props) => <List.Icon {...props} icon="food-variant" />}
              expanded={isDinnerOpen}
              onPress={() =>
                setIsDinnerOpen((prevIsDinnerOpen) => !prevIsDinnerOpen)
              }
              style={styles.accordion}
            >
              <List.Item title="Spaghetti Bolognese" />
              <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
              <List.Item title="Steak Frites" />
            </List.Accordion>
            <List.Accordion
              title="Drinks"
              left={(props) => <List.Icon {...props} icon="cup" />}
              expanded={isDrinksOpen}
              onPress={() =>
                setIsDrinksOpen((prevIsDrinksOpen) => !prevIsDrinksOpen)
              }
              style={styles.accordion}
            >
              <List.Item title="Coffee" />
              <List.Item title="Tea" />
              <List.Item title="Modelo" />
              <List.Item title="Coke" />
              <List.Item title="Fanta" />
            </List.Accordion>
          </ScrollView>
        </>
      ) : (
        <View style={styles.unavailable}>
          <Typography variant="subtitle">
            Restaurant Details Unavailable
          </Typography>
        </View>
      )}
    </Layout>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    accordion: {
      paddingHorizontal: theme.spacing.xl,
      backgroundColor: theme.colors.bg.primary,
    },
    backButton: {
      borderRadius: 5,
      alignItems: "flex-start",
    },
    mediumText: {
      fontSize: theme.fontSizes.subtitle,
    },
    unavailable: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default RestaurantDetailsScreen;
