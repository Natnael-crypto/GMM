import { evaluateRuleTree } from '@/lib/form/rule-evalutator';

export const getFields = (formData: any, displayTemplate: any) => {
  if (!formData) return [];
  if (!displayTemplate) return [];

  const dataMap: Record<string, string> = {};

  if (formData) {
    for (const data of formData) {
      const fieldName = data?.field?.name;
      const options = data?.field?.options;

      if (fieldName && options) {
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
    if (Array.isArray(item.value)) {
      formView.push({
        iconName: item.icon,
        label: item.label,
        value: item.value
          .map((subItem: { label: string; value: string }) => {
            if (!dataMap[subItem.value]) return null;
            return {
              label: subItem.label,
              value: dataMap[subItem.value],
            };
          })
          .filter((subItem: any) => subItem),
      });
    } else {
      if (!dataMap[item.value]) continue;

      formView.push({
        iconName: item.icon,
        label: item.label,
        value: dataMap[item.value],
      });
    }
  }

  return formView;
};
