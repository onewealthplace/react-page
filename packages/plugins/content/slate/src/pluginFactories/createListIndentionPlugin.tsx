import createSlateEditList from '@guestbell/slate-edit-list';
import createBasePlugin from './createBasePlugin';

type Definition = {
  iconIncrease: JSX.Element;
  iconDecrease: JSX.Element;
  listItemType: string;
  listTypes: string[];
};

const ceateSlatePlugin = (def: Definition) => {
  const slateEditList = createSlateEditList({
    typeItem: def.listItemType,
    types: def.listTypes,
  });

  return [
    createBasePlugin({
      pluginType: 'custom',
      addToolbarButton: true,
      addHoverButton: false,
      icon: def.iconIncrease,
      customAdd: editor => {
        slateEditList.changes.increaseItemDepth(editor);
      },
      customRemove: editor => {
        slateEditList.changes.decreaseItemDepth(editor);
      },
      isDisabled: editor => {
        const editorState = editor.value;

        const previousItem = slateEditList.utils.getPreviousItem(editorState);
        const currentItem = slateEditList.utils.getCurrentItem(editorState);
        const canIncrease = Boolean(previousItem && currentItem);
        return !canIncrease;
      },
    }),
    createBasePlugin({
      pluginType: 'custom',
      addToolbarButton: true,
      addHoverButton: false,
      icon: def.iconDecrease,
      customAdd: editor => {
        slateEditList.changes.decreaseItemDepth(editor);
      },
      customRemove: editor => {
        slateEditList.changes.increaseItemDepth(editor);
      },
      isDisabled: editor => {
        const editorState = editor.value;

        const currentItem = slateEditList.utils.getCurrentItem(editorState);
        const itemDepth = slateEditList.utils.getItemDepth(editorState);

        const canDecrease = Boolean(itemDepth > 1 && currentItem);
        return !canDecrease;
      },
    }),
  ];
};

function createListIndentionPlugin(def: Definition) {
  const customizablePlugin = function(
    customize: (def2: Definition) => Definition
  ) {
    return createListIndentionPlugin(customize(def));
  };
  customizablePlugin.toPlugin = () => ceateSlatePlugin(def);
  return customizablePlugin;
}

export default createListIndentionPlugin;
