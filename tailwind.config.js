
module.exports = {
  darkMode: 'class',
  content: [
    './public/*.html',
    './src/*.vue',
    './src/views/*.vue',
    './src/components/*.vue',
    './src/components/utilities/*.vue',
  ],
  theme: {
    backgroundColor: theme => theme('colors'),
    textColor: theme => theme('colors'),
    fill: theme => theme('colors'),
    screens: {
      'sm': {'min': '640px'},
      'md': {'min': '724px'},
      'lg': {'min': '1000px'},
      'xl': {'min': '1280px'},
    },
    extend: {
      colors: {
        'white': '#ffffff',
        'black': '#000000',
        'white-mask-1/4': 'rgba(255,255,255,.25)',
        'mask-1/4': 'rgba(0,0,0,.25)',
        'mask-2/4': 'rgba(0,0,0,.5)',
        'mask-3/4': 'rgba(0,0,0,.75)',
      },
      boxShadow: {
        'normal': '0px 0px 10px 1px rgba(0, 0, 0, 0.12)',
        'white-normal': '0px 0px 10px 1px rgba(255, 255, 255, 0.72)',
      },
      borderRadius: {
        '2/4': '50%',
      },
      flex: {
        '100': '1 1 100%',
      },
      padding: {
        '2px': '2px',
        '10px': '10px',
        '15px': '15px',
        '20px': '20px',
      },
    }
  }
}
