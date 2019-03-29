import { shallowMount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'

describe('DataTable.vue', () => {

  it('component does render', () => {
    const wrapper = shallowMount(DataTable)
    expect(wrapper.attributes()['data-test-component']).toBe('DataTable')
    expect(wrapper.contains('[data-test-component="DataTable"]')).toBe(true)
    expect(wrapper.contains('[data-test-TableHeader]')).toBe(true)
    expect(wrapper.contains('[data-test-TableBody]')).toBe(true)
    expect(wrapper.contains('[data-test-TableFooter]')).toBe(true)
  })

  function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  it('generates correct number of rows', () => {
    let items = []
    for (let i = 0; i < randomInt(1000); i++) {
      items.push({ name: 'Kyra Lester'})
    }

    const wrapper = shallowMount(DataTable, {
      propsData:  { items }
    })

    expect(wrapper.findAll('[data-test-TableRow]').length).toBe(items.length)
  })


  it('generates correct number of columns/cells in row', () => {
    const numItems = randomInt(1000);
    let items = [];

    for (let i = 0; i < numItems; i++) {
      items.push({
      "ID": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "Name": "Kyra Lester",
      "Description": "Curabitur dictum. Phasellus in",
      "Date": "2017-07-23T04:24:49-07:00",
      "Amount": 345.54
    });
    }

    const wrapper = shallowMount(DataTable, {
      propsData:  { items }
    })

    let rows = wrapper.findAll('[data-test-TableRow]');

    for (var i = 0; i < rows.length; i++) {
      expect(
        rows.at(i).findAll('[data-test-TableCell]').length
      ).toBe(Object.keys(items[0]).length);
    }

    expect(
      wrapper.findAll('[data-test-TableCell]').length
    ).toBe(numItems * Object.keys(items[0]).length)

  })

  it('generates correct table headers', () => {

    let items = [{
      "ID": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "Name": "Kyra Lester",
      "Description": "Curabitur dictum. Phasellus in",
      "Date": "2017-07-23T04:24:49-07:00",
      "Amount": 345.54
    }]

    const wrapper = shallowMount(DataTable, {
      propsData:  { items }
    })

    let headers = wrapper.findAll('[data-test-HeaderCell]')
    let expectedHeaders = Object.keys(items[0]);


    for (var i = 0; i < headers.length; i++) {
      expect(
        headers.at(i).text()
      ).toBe((expectedHeaders[i]))
    }

  })

  let items = [
    {
      "ID": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "Name": "Kyra Lester",
      "Description": "Curabitur dictum. Phasellus in",
      "Date": "2017-07-23T04:24:49-07:00",
      "Amount": 345.54
    },
    {
      "ID": "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
      "Name": "Buckminster Alvarado",
      "Description": "dui, in sodales elit erat vitae risus. Duis a mi",
      "Date": "2018-11-08T05:44:15-08:00",
      "Amount": 677.08
    },
    {
      "ID": "B743AC82-3613-13A2-2E42-E0C1F5CBF8A6",
      "Name": "Athena Smith",
      "Description": "massa lobortis ultrices. Vivamus rhoncus.",
      "Date": "2018-11-11T06:19:57-08:00",
      "Amount": 73.67
    }
  ]

  let item1 = items[0];
  let item2 = items[1];
  let item3 = items[2];

  const wrapper = shallowMount(DataTable, {
    propsData:  { items }
  })

  let rows = wrapper.findAll('[data-test-TableRow]');
  let row1Cells = rows.at(0).findAll('[data-test-TableCell]');
  let row2Cells = rows.at(1).findAll('[data-test-TableCell]');
  let row3Cells = rows.at(2).findAll('[data-test-TableCell]');

  it('can sort table by Amount', () => {
    let amountColumn = wrapper.findAll('[data-test-HeaderCell]').at(4)
    amountColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['ID'])
    expect(row1Cells.at(1).text()).toBe(item3['Name'])
    expect(row1Cells.at(2).text()).toBe(item3['Description'])
    expect(row1Cells.at(3).text()).toBe(item3['Date'])
    expect(row1Cells.at(4).text()).toBe((item3['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item1['ID'])
    expect(row2Cells.at(1).text()).toBe(item1['Name'])
    expect(row2Cells.at(2).text()).toBe(item1['Description'])
    expect(row2Cells.at(3).text()).toBe(item1['Date'])
    expect(row2Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item2['ID'])
    expect(row3Cells.at(1).text()).toBe(item2['Name'])
    expect(row3Cells.at(2).text()).toBe(item2['Description'])
    expect(row3Cells.at(3).text()).toBe(item2['Date'])
    expect(row3Cells.at(4).text()).toBe((item2['Amount']).toString())

    // reverse
    amountColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item2['ID'])
    expect(row1Cells.at(1).text()).toBe(item2['Name'])
    expect(row1Cells.at(2).text()).toBe(item2['Description'])
    expect(row1Cells.at(3).text()).toBe(item2['Date'])
    expect(row1Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item1['ID'])
    expect(row2Cells.at(1).text()).toBe(item1['Name'])
    expect(row2Cells.at(2).text()).toBe(item1['Description'])
    expect(row2Cells.at(3).text()).toBe(item1['Date'])
    expect(row2Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['ID'])
    expect(row3Cells.at(1).text()).toBe(item3['Name'])
    expect(row3Cells.at(2).text()).toBe(item3['Description'])
    expect(row3Cells.at(3).text()).toBe(item3['Date'])
    expect(row3Cells.at(4).text()).toBe((item3['Amount']).toString())
  })

  it('can sort table by ID', () => {
    let idColumn = wrapper.findAll('[data-test-HeaderCell]').at(0)
    idColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['ID'])
    expect(row1Cells.at(1).text()).toBe(item1['Name'])
    expect(row1Cells.at(2).text()).toBe(item1['Description'])
    expect(row1Cells.at(3).text()).toBe(item1['Date'])
    expect(row1Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['ID'])
    expect(row3Cells.at(1).text()).toBe(item3['Name'])
    expect(row3Cells.at(2).text()).toBe(item3['Description'])
    expect(row3Cells.at(3).text()).toBe(item3['Date'])
    expect(row3Cells.at(4).text()).toBe((item3['Amount']).toString())

    // reverse
    idColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['ID'])
    expect(row1Cells.at(1).text()).toBe(item3['Name'])
    expect(row1Cells.at(2).text()).toBe(item3['Description'])
    expect(row1Cells.at(3).text()).toBe(item3['Date'])
    expect(row1Cells.at(4).text()).toBe((item3['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['ID'])
    expect(row3Cells.at(1).text()).toBe(item1['Name'])
    expect(row3Cells.at(2).text()).toBe(item1['Description'])
    expect(row3Cells.at(3).text()).toBe(item1['Date'])
    expect(row3Cells.at(4).text()).toBe((item1['Amount']).toString())
  })

  it('can sort table by Name', () => {
    let nameColumn = wrapper.findAll('[data-test-HeaderCell]').at(1)
    nameColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['ID'])
    expect(row1Cells.at(1).text()).toBe(item3['Name'])
    expect(row1Cells.at(2).text()).toBe(item3['Description'])
    expect(row1Cells.at(3).text()).toBe(item3['Date'])
    expect(row1Cells.at(4).text()).toBe((item3['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['ID'])
    expect(row3Cells.at(1).text()).toBe(item1['Name'])
    expect(row3Cells.at(2).text()).toBe(item1['Description'])
    expect(row3Cells.at(3).text()).toBe(item1['Date'])
    expect(row3Cells.at(4).text()).toBe((item1['Amount']).toString())

    // reverse
    nameColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['ID'])
    expect(row1Cells.at(1).text()).toBe(item1['Name'])
    expect(row1Cells.at(2).text()).toBe(item1['Description'])
    expect(row1Cells.at(3).text()).toBe(item1['Date'])
    expect(row1Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['ID'])
    expect(row3Cells.at(1).text()).toBe(item3['Name'])
    expect(row3Cells.at(2).text()).toBe(item3['Description'])
    expect(row3Cells.at(3).text()).toBe(item3['Date'])
    expect(row3Cells.at(4).text()).toBe((item3['Amount']).toString())
  })

  it('can sort table by Description', () => {
    let descriptionColumn = wrapper.findAll('[data-test-HeaderCell]').at(2)
    descriptionColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['ID'])
    expect(row1Cells.at(1).text()).toBe(item1['Name'])
    expect(row1Cells.at(2).text()).toBe(item1['Description'])
    expect(row1Cells.at(3).text()).toBe(item1['Date'])
    expect(row1Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['ID'])
    expect(row3Cells.at(1).text()).toBe(item3['Name'])
    expect(row3Cells.at(2).text()).toBe(item3['Description'])
    expect(row3Cells.at(3).text()).toBe(item3['Date'])
    expect(row3Cells.at(4).text()).toBe((item3['Amount']).toString())

    // reverse
    descriptionColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['ID'])
    expect(row1Cells.at(1).text()).toBe(item3['Name'])
    expect(row1Cells.at(2).text()).toBe(item3['Description'])
    expect(row1Cells.at(3).text()).toBe(item3['Date'])
    expect(row1Cells.at(4).text()).toBe((item3['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['ID'])
    expect(row3Cells.at(1).text()).toBe(item1['Name'])
    expect(row3Cells.at(2).text()).toBe(item1['Description'])
    expect(row3Cells.at(3).text()).toBe(item1['Date'])
    expect(row3Cells.at(4).text()).toBe((item1['Amount']).toString())
  })

  it('can sort table by Date', () => {
    let dateColumn = wrapper.findAll('[data-test-HeaderCell]').at(3)
    dateColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['ID'])
    expect(row1Cells.at(1).text()).toBe(item1['Name'])
    expect(row1Cells.at(2).text()).toBe(item1['Description'])
    expect(row1Cells.at(3).text()).toBe(item1['Date'])
    expect(row1Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['ID'])
    expect(row3Cells.at(1).text()).toBe(item3['Name'])
    expect(row3Cells.at(2).text()).toBe(item3['Description'])
    expect(row3Cells.at(3).text()).toBe(item3['Date'])
    expect(row3Cells.at(4).text()).toBe((item3['Amount']).toString())

    // reverse
    dateColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['ID'])
    expect(row1Cells.at(1).text()).toBe(item3['Name'])
    expect(row1Cells.at(2).text()).toBe(item3['Description'])
    expect(row1Cells.at(3).text()).toBe(item3['Date'])
    expect(row1Cells.at(4).text()).toBe((item3['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['ID'])
    expect(row3Cells.at(1).text()).toBe(item1['Name'])
    expect(row3Cells.at(2).text()).toBe(item1['Description'])
    expect(row3Cells.at(3).text()).toBe(item1['Date'])
    expect(row3Cells.at(4).text()).toBe((item1['Amount']).toString())
  })

  // Create parameterized test
  // it('can sort table by', () => {

  //   let headers = wrapper.findAll('[data-test-HeaderCell]')

  //   for (var i = 0; i < headers.length; i++) {
  //     let currentHeader = headers.at(i);
  //     // currentHeader.trigger('click');
  //   }

  // })

})
