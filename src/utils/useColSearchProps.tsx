import React, { useState, useRef, useCallback } from 'react';
import { Input, Space, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export type GetColumnSearchPropsFn = (
  dataIndex: string,
  columnName: string
) => Record<string, unknown>;

const useColSearchProps = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchColumn] = useState('');

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };
  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText('');
  };

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const getColumnSearchProps = useCallback<GetColumnSearchPropsFn>(
    (dataIndex, columnName) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            //@ts-ignore
            ref={searchInputRef}
            placeholder={`Search ${columnName}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            {/* <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false })
            setState({
              searchText: selectedKeys[0],
              searchedColumn: dataIndex
            })
          }}
        >
          Filter
        </Button> */}
          </Space>
        </div>
      ),
      filterIcon: (filtered: any) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value: any, record: any) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: (visible: any) => {
        if (visible) {
          setTimeout(() => searchInputRef?.current?.select(), 100);
        }
      },
      render: (text: any) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text ?? null
        )
    }),
    [searchText, searchedColumn]
  );

  return {
    getColumnSearchProps
  };
};

export default useColSearchProps;
