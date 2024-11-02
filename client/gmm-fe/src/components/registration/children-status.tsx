import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';

export default function ChildrenStatus() {
  const form = useFormContext();

  const hasChildren = form.watch('hasChildren') !== 'No kids';

  const numberOfChildren = form.watch('numberOfChildren');

  if (!hasChildren) return;

  return (
    <div className="col-span-4 grid grid-cols-8 gap-x-5 gap-y-4">
      {hasChildren && (
        <div className="space-y-1 py-2 col-span-8 sm:col-span-2">
          <Label>Number of children</Label>
          <FormField
            name="numberOfChildren"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ? field.value.toString() : ''}
                  >
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 15 }, (_, i) => i + 1).map((i) => (
                        <SelectItem
                          className="text-md max-w-80"
                          key={i}
                          value={i.toString()}
                        >
                          {i}
                        </SelectItem>
                      ))}
                      <SelectItem className="text-md max-w-80" value="15">
                        More than 15
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-md" />
              </FormItem>
            )}
          />
        </div>
      )}
      {hasChildren && (
        <div className="space-y-1 py-2 col-span-4 sm:col-span-3">
          <Label>
            {numberOfChildren > 1 ? 'Age of Youngest Child' : 'Age of Child'}
          </Label>
          <FormField
            name="ageOfYoungestChild"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ? field.value.toString() : ''}
                  >
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      <SelectItem className="text-md max-w-80" value="0">
                        Under 1 year
                      </SelectItem>
                      {Array.from({ length: 100 }, (_, i) => i + 1).map((i) => {
                        if (
                          numberOfChildren > 1 &&
                          parseInt(form.watch('ageOfOldestChild')) < i
                        ) {
                          return null;
                        }

                        return (
                          <SelectItem
                            className="text-md max-w-80"
                            key={i}
                            value={i.toString()}
                          >
                            {i}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-md" />
              </FormItem>
            )}
          />
        </div>
      )}
      {hasChildren && numberOfChildren > 1 && (
        <div className="space-y-1 py-2 col-span-4 sm:col-span-3">
          <Label>Age of Oldest Child</Label>
          <FormField
            name="ageOfOldestChild"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ? field.value.toString() : '0'}
                  >
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      <SelectItem className="text-md max-w-80" value="0">
                        Under 1 year
                      </SelectItem>
                      {Array.from({ length: 100 }, (_, i) => i + 1).map((i) => {
                        if (parseInt(form.watch('ageOfYoungestChild')) > i) {
                          return null;
                        }
                        return (
                          <SelectItem
                            className="text-md max-w-80"
                            key={i}
                            value={i.toString()}
                          >
                            {i}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-md" />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}
