import { evaluateRuleTree } from '@/lib/form/rule-evaluator';

export const getFields = (formData: any, displayTemplate: any) => {
  if (!formData) return [];
  if (!displayTemplate) return [];

  // fieldName: value (value in internal representation)
  const originalDataMap: Record<string, any> = {};

  // fieldName: value label (for user view)
  const dataMap: Record<string, string> = {};

  if (formData) {
    for (const data of formData) {
      const fieldName = data?.field?.name;
      const options = data?.field?.options;

      if (fieldName && options) {
        originalDataMap[fieldName] = data.value;

        if (data?.field.type === 'multiselect') {
          if (!data.value) continue;
          if (Array.isArray(data.value)) {
            dataMap[fieldName] = data.value
              ?.map(
                (value: string) =>
                  options.find(
                    (option: { label: string; value: string }) =>
                      option.value === value
                  )?.label
              )
              .join(', ');
          } else {
            dataMap[fieldName] = options.find(
              (option: { label: string; value: string }) =>
                option.value === data.value
            )?.label;
          }
        } else {
          dataMap[fieldName] = options.find(
            (option: { label: string; value: string }) =>
              option.value === data.value
          )?.label;
        }
      }
    }
  }

  const formView = [];

  for (const item of displayTemplate) {
    if (evaluateRuleTree(item.show, originalDataMap)) {
      // Item with sub items
      if (Array.isArray(item.value)) {
        formView.push({
          iconName: item.icon,
          label: item.label,
          value: item.value
            .map((subItem: { label: string; value: string; show: any }) => {
              if (evaluateRuleTree(subItem.show, originalDataMap)) {
                return {
                  label: subItem.label,
                  value: dataMap[subItem.value],
                };
              }

              return null;
            })
            .filter((subItem: any) => subItem),
        });
      }

      //
      else {
        formView.push({
          iconName: item.icon,
          label: item.label,
          value: dataMap[item.value],
        });
      }
    }

    console.log(
      item.label,
      item.show,
      evaluateRuleTree(item.show, originalDataMap)
    );
  }

  // console.log(formView);
  // console.log(dataMap);
  // console.log(originalDataMap);

  return formView;
};
