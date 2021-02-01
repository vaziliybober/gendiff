export default (stringifyValue, stringifyNode, composeStringNodes) => (diffStructure) => {
  const iter = (currentDiffStructure, depth, path) => {
    const diffStrings = currentDiffStructure.flatMap((node) => {
      const {
        name, status, value, valueBefore, valueAfter, children,
      } = node;

      const newDepth = depth + 1;
      const newPath = [...path, name];
      const options = {
        depth: newDepth,
        path: newPath,
      };

      if (status === 'nested') {
        return stringifyNode(
          {
            name,
            status,
            stringValue: iter(children, newDepth, newPath),
          },
          options,
        );
      }

      const stringValue = stringifyValue(value, newDepth);
      const stringValueBefore = stringifyValue(valueBefore, newDepth);
      const stringValueAfter = stringifyValue(valueAfter, newDepth);

      return stringifyNode(
        {
          name,
          status,
          stringValue,
          stringValueBefore,
          stringValueAfter,
        },
        options,
      );
    });

    return composeStringNodes(diffStrings, { depth });
  };

  return iter(diffStructure, 0, []);
};
