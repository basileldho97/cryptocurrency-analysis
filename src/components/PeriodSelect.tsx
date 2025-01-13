import { Space, Select, Typography } from "antd";

const PeriodSelect = ({func}) => {

    const handleSelect = (value) => {
        func(value)
      };

      const periods = ['all', '24h', '1w', '1m', '3m', '6m', '1y',]

    return ( 
        <Select
        className="period-select"
        placeholder="period"
        onSelect={handleSelect}
        optionLabelProp="label"
        options={periods.map(period => ({
            label: period,
            value: period,
        }))}
        optionRender={(option) => (
          <Space style={{display: 'flex', alignItems: 'center',}}>
            <Typography.Text>{option.data.label}</Typography.Text>
          </Space>
        )}
      />
     );
}
 
export default PeriodSelect;