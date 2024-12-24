import { evaluateRuleTree } from '@/lib/form/rule-evaluator';

export const interpolate = (string: string, context: any) =>
  string.replaceAll(/\{([^}]+)\}/gi, (_, a) =>
    a.split('.').reduce((b: any, c: any) => b?.[c] ?? '', context)
  );

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
      } else {
        if (fieldName) {
          originalDataMap[fieldName] = data.value;
          dataMap[fieldName] = data.value;
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
            .map(
              (subItem: {
                label: string;
                value: string;
                show: any;
                icon: string;
                class: string;
                context: any;
              }) => {
                const value = interpolate(subItem.value, dataMap);
                const realValue = value.split('(')[0].trim();
                const context = value.split('(')[1]?.split(')')?.[0];

                if (evaluateRuleTree(subItem.show, originalDataMap)) {
                  let showContext = subItem.context;

                  if (showContext === 'KEEP') {
                    showContext = false;
                  } else {
                    showContext = evaluateRuleTree(
                      subItem.context,
                      originalDataMap
                    );
                  }

                  return {
                    className: subItem.class,
                    iconName: subItem.icon,
                    label: subItem.label,
                    value: subItem.context === 'KEEP' ? value : realValue,
                    context: showContext ? context : undefined,
                  };
                }

                return null;
              }
            )
            .filter((subItem: any) => subItem),
        });
      }

      //
      else {
        const value = interpolate(item.value, dataMap);
        const realValue = value.split('(')[0].trim();
        const context = value.split('(')[1]?.split(')')?.[0];

        let showContext = item.context;

        if (showContext === 'KEEP') {
          showContext = false;
        } else {
          showContext = evaluateRuleTree(item.context, originalDataMap);
        }

        formView.push({
          className: item.class,
          iconName: item.icon,
          label: item.label,
          value: item.context === 'KEEP' ? value : realValue,
          context: showContext ? context : undefined,
        });
      }
    }
  }

  return formView;
};
