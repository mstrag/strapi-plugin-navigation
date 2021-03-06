import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { isEmpty, isNumber } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from '@buffetjs/core';
import CardWrapper from "./CardWrapper";
import CardItem from "./CardItem";
import ItemFooter from "../ItemFooter";
import { navigationItemType } from "../../containers/View/utils/enums";
import CardItemPath from "./CardItemPath";
import CardItemTitle from "./CardItemTitle";
import CardItemLevelAdd from "./CardItemLevelAdd";
import List from "../List";
import CardItemLevelWrapper from "./CardItemLevelWrapper";
import CardItemRestore from "./CardItemRestore";
import pluginId from "../../pluginId";

const Item = (props) => {
  const { 
    item, 
    level = 0,
    allowedLevels,
    relatedRef,
    onItemClick,
    onItemRestoreClick,
    onItemLevelAddClick } = props;
  const {
    viewId,
    title,
    type,
    path,
    removed,
    edited,
    externalPath,
    menuAttached,
  } = item;
  const footerProps = {
    type: type || navigationItemType.INTERNAL,
    removed,
    menuAttached,
    relatedRef,
  };

  const { formatMessage } = useIntl();

  const isMenuAllowedLevel = isNumber(allowedLevels) ? level < (allowedLevels - 1) : true;
  const isExternal = item.type === navigationItemType.EXTERNAL;
  const hasChildren = !isEmpty(item.items) && !isExternal;

  return (
    <CardWrapper level={level}>
      <CardItem
        hasChildren={hasChildren}
        removed={removed}
        onClick={(e) =>
          removed ? null : onItemClick(e, {
            ...item,
            isMenuAllowedLevel,
          })
        }
      >
        { removed && (<CardItemRestore>
            <Button
              onClick={e => onItemRestoreClick(e, item)}
              color="secondary"
              label={formatMessage({
                id: `${pluginId}.popup.item.form.button.restore`
              })}
            />
          </CardItemRestore>)}
        <CardItemTitle>{title}</CardItemTitle>
        <CardItemPath>
          {type === navigationItemType.EXTERNAL ? externalPath : path}
        </CardItemPath>
        <ItemFooter {...footerProps} />
      </CardItem>
      { !(isExternal || removed) && (<CardItemLevelAdd
        color={isMenuAllowedLevel ? "primary" : "secondary"}
        icon={<FontAwesomeIcon icon={faPlus} size="3x" />}
        onClick={(e) => onItemLevelAddClick(e, viewId, isMenuAllowedLevel)}
        menuLevel={isMenuAllowedLevel}
      />) }
      {hasChildren && !removed && (
        <List
          items={item.items}
          onItemClick={onItemClick}
          onItemRestoreClick={onItemRestoreClick}
          onItemLevelAddClick={onItemLevelAddClick}
          as={CardItemLevelWrapper}
          level={level + 1}
          allowedLevels={allowedLevels}
        />
      )}
    </CardWrapper>
  );
};

Item.propTypes = {
  item: PropTypes.objectOf({
    title: PropTypes.string,
    type: PropTypes.string,
    uiRouterKey: PropTypes.string,
    path: PropTypes.string,
    externalPath: PropTypes.string,
    audience: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    related: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    menuAttached: PropTypes.bool,
  }).isRequired,
  relatedRef: PropTypes.object,
  level: PropTypes.number,
  onItemClick: PropTypes.func.isRequired,
  onItemRestoreClick: PropTypes.func.isRequired,
  onItemLevelAddClick: PropTypes.func.isRequired,
};

export default Item;
