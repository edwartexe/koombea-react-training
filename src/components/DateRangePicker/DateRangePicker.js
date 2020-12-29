import styles from "./DateRangePicker.module.css";

import { Text, Checkbox, Radio, Stack, RadioGroup } from "@chakra-ui/react";

const DateRangePicker = (props) => (
<div className={styles.wrapper}>
  <div className={styles.layout}>

    <Text 
      as="h2"
      fontSize="18px"
      lineHeight="24px"
      fontWeight="600"
      textAlign="center"
    > 
      Select Timeframe
    </Text>

    <RadioGroup onChange={props.setPeriod} defaultValue="Yearly">
      <Stack direction="column">
        <Radio colorScheme="brand" value="Yearly">Yearly</Radio>
        <Radio colorScheme="brand" value="Quarterly">Quarterly</Radio>
        <Radio colorScheme="brand" value="Monthly">Monthly</Radio>
      </Stack>
    </RadioGroup>

    <label htmlFor="selectAll">
      <Checkbox
        type="checkbox"
        colorScheme="brand"
        id="selectAll"
        name="selectAll"
        isChecked={props.selectAll}
        mr="5px"
        isDisabled={props.selectAllenabled ? "disabled" : ""}
        onChange={(e) => props.setSelectAll(e.target.checked)}
      />
      Select All
    </label>

    {props.showFav? 
      <label htmlFor="favFilter">
        <Checkbox
          type="checkbox"
          colorScheme="brand"
          id="favFilter"
          name="favFilter"
          isChecked={props.favFilter}
          mr="5px"
          onChange={(e) => props.setFavFilter( e.target.checked)}
        />
        Solo Favoritos
      </label>
    :
      null
    }

    <div className={styles.dateDisplay}>
      <p className={styles.dateBlock}>
        {" "}
        {props.dateStart.getFullYear() +
          "-" +
          (props.dateStart.getMonth() + 1) +
          "-" +
          props.dateStart.getDate()}
      </p>
      <p className={styles.dateBlock}>
        {" "}
        {props.dateEnd.getFullYear() +
          "-" +
          (props.dateEnd.getMonth() + 1) +
          "-" +
          props.dateEnd.getDate()}
      </p>
    </div>

  </div>
  {props.children}
</div>
);

export default DateRangePicker;
