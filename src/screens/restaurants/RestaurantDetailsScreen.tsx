/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { List, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

import { Theme } from "../../ts/types/theme";
import { RestaurantsStackScreenProps } from "../../ts/types/navigation";
import { mockMenu } from "../../utils/mocks/menu";
import Layout from "../../components/Layout";
import Spacer from "../../components/Spacer";
import AlternateText from "../../components/AlternateText";
import RestaurantCard from "../../components/restaurants/RestaurantCard";
import MenuItem from "../../components/restaurants/MenuItem";

const RestaurantDetailsScreen = ({ route }: RestaurantsStackScreenProps) => {
  const restaurant = route.params?.restaurant;
  const [isBreakfastOpen, setIsBreakfastOpen] = useState<boolean>(false);
  const [isLunchOpen, setIsLunchOpen] = useState<boolean>(false);
  const [isDinnerOpen, setIsDinnerOpen] = useState<boolean>(false);
  const [isDrinksOpen, setIsDrinksOpen] = useState<boolean>(false);
  const theme = useTheme<Theme>();
  const styles = makeStyles(theme);

  return (
    <Layout>
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
              <Spacer position="bottom" size="md" />
              {mockMenu.breakfast.map((item) => (
                <Spacer
                  key={item.id}
                  position="bottom"
                  size="xl"
                  style={styles.menuItem}
                >
                  <MenuItem item={item} />
                </Spacer>
              ))}
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
              <Spacer position="bottom" size="md" />
              {mockMenu.lunch.map((item) => (
                <Spacer
                  key={item.id}
                  position="bottom"
                  size="xl"
                  style={styles.menuItem}
                >
                  <MenuItem item={item} />
                </Spacer>
              ))}
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
              <Spacer position="bottom" size="md" />
              {mockMenu.dinner.map((item) => (
                <Spacer
                  key={item.id}
                  position="bottom"
                  size="xl"
                  style={styles.menuItem}
                >
                  <MenuItem item={item} />
                </Spacer>
              ))}
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
              <Spacer position="bottom" size="md" />
              {mockMenu.drinks.map((item) => (
                <Spacer
                  key={item.id}
                  position="bottom"
                  size="xl"
                  style={styles.menuItem}
                >
                  <MenuItem item={item} />
                </Spacer>
              ))}
            </List.Accordion>
          </ScrollView>
        </>
      ) : (
        <AlternateText title="Restaurant Details Unavailable" />
      )}
    </Layout>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    accordion: {
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.bg.primary,
    },
    mediumText: {
      fontSize: theme.fontSizes.subtitle,
    },
    menuItem: {
      paddingRight: theme.spacing.xl,
      paddingLeft: theme.spacing.xl,
    },
  });

export default RestaurantDetailsScreen;
