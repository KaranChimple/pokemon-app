import React from "react";
import { startCase } from 'lodash';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

const withInfinite = ({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage
}) => {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => { } : loadNextPage;
  const isItemLoaded = index => !hasNextPage || index < items.length;

  return React.forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"));
    const itemSize = smUp ? 36 : 48;

    const outerElementType = React.useMemo(() => {
      return React.forwardRef((props2, ref2) => (
        <div ref={ref}>
          <div ref={ref2} {...props2} {...other} />
        </div>
      ));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const renderRow = ({ data, index, style }) => {
      return !data || index >= data.length ? (
        <div />
      ) : (
          React.cloneElement(data[index], {
            style: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
              ...style
            }
          })
        );
    };

    return (
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
        threshold={5}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            style={{
              padding: 0,
              height: Math.min(8, itemCount) * itemSize,
              maxHeight: "auto"
            }}
            itemData={children}
            height={250}
            width="100%"
            outerElementType={outerElementType}
            innerElementType="ul"
            itemSize={itemSize}
            itemCount={itemCount}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    );
  });
};

const useStyles = makeStyles({
  listbox: {
    "& ul": {
      padding: 0,
      margin: 0
    }
  }
});

export default function InfiniteAutocomplete({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  onDataSelected,
}) {
  const classes = useStyles();
  const ListboxComponent = withInfinite({
    hasNextPage,
    isNextPageLoading,
    items,
    loadNextPage
  });

  return (
    <div style={{ marginLeft: '35%' }}>
      <Autocomplete
        id="virtualize-demo"
        style={{ width: 300 }}
        disableListWrap
        classes={classes}
        ListboxComponent={ListboxComponent}
        options={items}
        getOptionLabel={option => startCase(option.name)}
        onChange={(_, option) => onDataSelected(option)}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Select your Pokémon"
            fullWidth
          />
        )}
      />
    </div>
  );
}