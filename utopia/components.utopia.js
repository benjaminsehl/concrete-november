import * as Utopia from 'utopia-api'
import { Image, Money } from '@shopify/hydrogen'
import {
  RecommendedProductsGrid,
  BlogComponent,
} from '../app/components/Layout'

const ImageCropControl = Utopia.popupListControl([
  { value: 'top', label: 'top' },
  { value: 'center', label: 'center' },
  { value: 'bottom', label: 'bottom' },
  { value: 'left', label: 'left' },
  { value: 'right', label: 'right' },
])

const ImageTypeControl = Utopia.objectControl({
  altText: Utopia.stringControl(),
  id: Utopia.stringControl(),
  url: Utopia.stringControl(),
  height: Utopia.numberControl(),
  width: Utopia.numberControl(),
})

const CurrencyCodeControl = Utopia.popupListControl([
  {
    value: 'AED',
    label: 'United Arab Emirates Dirham (AED)',
  },
  {
    value: 'AFN',
    label: 'Afghan Afghani (AFN).',
  },
  {
    value: 'EUR',
    label: 'Euro (EUR).',
  },
  // TODO: all currencies
])

const UnitPriceMeasurementMeasuredUnit =
  Utopia.popupListControl([
    {
      label: 'CL',
      value: 'Centiliter',
    },
    {
      value: 'CM',
      label: 'Centimeter',
    },
    {
      value: 'G',
      label: 'Gram',
    },
    {
      value: 'KG',
      label: 'Kilogram',
    },
    {
      value: 'L',
      label: 'Liter',
    },
    {
      value: 'M',
      label: 'Meter',
    },
    {
      value: 'M2',
      label: 'Square meter',
    },
    {
      value: 'M3',
      label: 'Cubic meter',
    },
    {
      value: 'MG',
      label: 'Milligram',
    },
    {
      value: 'ML',
      label: 'Milliliter',
    },
    {
      value: 'MM',
      label: 'Millimeter',
    },
  ])

const MoneyV2Control = Utopia.objectControl({
  amount: Utopia.stringControl(),
  currencyCode: CurrencyCodeControl,
})

const UnitPriceMeasurementControl = Utopia.objectControl({
  measuredType: Utopia.popupListControl([
    {
      value: 'AREA',
      label: 'Area',
    },
    {
      value: 'LENGTH',
      label: 'Length',
    },
    {
      value: 'VOLUME',
      label: 'Volume',
    },
    {
      value: 'WEIGHT',
      label: 'Weight',
    },
  ]),
  quantityUnit: UnitPriceMeasurementMeasuredUnit,
  quantityValue: Utopia.numberControl(),
  referenceUnit: UnitPriceMeasurementMeasuredUnit,
  referenceValue: Utopia.numberControl(), // this can only be int
})

const Components = {
  '@shopify/hydrogen': {
    // https://shopify.dev/docs/api/hydrogen-react/2024-01/components/image
    Image: {
      component: Image,
      properties: {
        aspectRatio: Utopia.stringControl(),
        crop: ImageCropControl,
        data: ImageTypeControl,
        // loader is omitted, we don't have a control description for functions yet
        srcSetOptions: Utopia.objectControl({
          intervals: Utopia.numberControl(),
          startingWidth: Utopia.numberControl(),
          incrementSize: Utopia.numberControl(),
          placeholderWidth: Utopia.numberControl(),
        }),
      },
      supportsChildren: false,
      variants: [
        {
          label: 'Image',
          code: "<Image data={{ altText: 'Example image', url: 'https://picsum.photos/200/300', height: 200, width: 300 }} />",
        },
        {
          label: 'Cropped Image',
          code: `<Image crop='center' data={{ altText: 'Example image', url: 'https://picsum.photos/200/300', height: 200, width: 300 }} />`,
        },
      ],
    },
    Money: {
      component: Money,
      properties: {
        data: MoneyV2Control,
        withoutCurrency: Utopia.checkboxControl(),
        withoutTrailingZeros: Utopia.checkboxControl(),
        measurement: UnitPriceMeasurementControl,
        measurementSeparator: {
          control: 'jsx',
          preferredChildComponents: [
            {
              name: 'span',
              variants: [
                {
                  label: '/',
                  code: '<span>/</span>',
                },
                {
                  label: ' per ',
                  code: '<span> per </span>',
                },
              ],
            },
          ],
        },
      },
      supportsChildren: false,
      variants: [
        {
          label: 'Money',
          code: '<Money data={{ amount: "9.99", currencyCode: "EUR" }} />',
        },
        {
          label: 'Money, with measurement',
          code: '<Money data={{ amount: "9.99", currencyCode: "EUR" }} measurement={{ referenceValue: 1, referenceUnit: "KG", }} />',
        },
        {
          label: 'Money, without currency',
          code: '<Money withoutCurrency data={{ amount: "9.99", currencyCode: "EUR" }} />',
        },
      ],
    },
  },
  '/app/components/Layout': {
    RecommendedProductsGrid: {
      component: RecommendedProductsGrid,
      supportsChildren: true,
      properties: {},
      variants: [],
    },
    BlogComponent: {
      component: BlogComponent,
      supportsChildren: true,
      properties: {
        title: {
          control: 'jsx',
          preferredChildComponents: [
            {
              name: 'h1',
              variants: [{ code: '<h1>Title</h1>' }],
            },
          ],
        },
        children: Utopia.arrayControl(Utopia.jsxControl()),
      },
      variants: [
        {
          label: 'Blog Post',
          code: '<BlogComponent title={<h1>Title</h1>}><div>Blog Post</div></BlogComponent>',
        },
        {
          label: 'Empty Blog Post',
          code: '<BlogComponent title={<h1>Title</h1>} />',
        },
      ],
      preferredChildComponents: [
        {
          name: 'div',
        },
      ],
    },
  },
}

export default Components
