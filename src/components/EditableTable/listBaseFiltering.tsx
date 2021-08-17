import React from 'react';
import { Input, Space, Button } from 'antd';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { SearchOutlined } from '@ant-design/icons';

type ColumnFilterProps<T> = {
  filterIcon: (isFiltered: boolean) => React.ReactNode;
  filterDropdown: (filterProps: FilterDropdownProps) => React.ReactNode;
  onFilter: (value: string | number | boolean, record: T) => boolean;
};

export function getAllFilterProps<T>(
  column: keyof T,
  searchEnabled: boolean
): ColumnFilterProps<T> | undefined {
  return searchEnabled
    ? {
        filterIcon: getFilterIcon,
        filterDropdown: (filterProps: FilterDropdownProps) =>
          getFilterDropdown<T>(column, filterProps),
        onFilter: (value: string | number | boolean, record: T) => {
          return onFilter<T>(value, column, record);
        }
      }
    : undefined;
}
function getFilterDropdown<T>(column: keyof T, filterProps: FilterDropdownProps) {
  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${column}`}
        value={filterProps.selectedKeys[0]}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
        onChange={(e) => filterProps.setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => {
          filterProps.confirm();
        }}
      ></Input>
      <Space />
      <Button
        type="primary"
        onClick={() => {
          filterProps.confirm();
        }}
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90 }}
      >
        Search
      </Button>
      <Button
        size="small"
        style={{ width: 90 }}
        onClick={() => {
          filterProps.clearFilters && filterProps.clearFilters();
          // this.handleReset(clearFilters)
        }}
      >
        Reset
      </Button>
    </div>
  );
}
function getFilterIcon(isFiltered: boolean) {
  return (
    <SearchOutlined
      style={{
        // color: isFiltered ? '#1890ff' : undefined,
        color: isFiltered ? '#18ff18' : undefined
      }}
    />
  );
}
function onFilter<T>(value: string | number | boolean, column: keyof T, record: T): boolean {
  if (!record[column]) return false;

  const entry: string = (record[column] as unknown as string).toLowerCase();
  const searchTerm = value.toString().toLowerCase();

  return entry.includes(searchTerm);
}
