import React from 'react'
import { SafeAreaView, Text, TextComponent } from 'react-native'

// export default function App() {
//   return (
//     <SafeAreaView>
//       <Text>Hello JSX world!</Text>
//     </SafeAreaView>
//   )
// }

// export default function App() {
//   const isLoading = true
//   if(isLoading) {
//     return (
//       <SafeAreaView>
//         <Text>Loding...</Text>
//       </SafeAreaView>
//     )
//   }
//   return (
//     <SafeAreaView>
//       <Text>Hello JSX World!</Text>
//     </SafeAreaView>
//   )
// }

// export default function App() {
//   const isLoading = true
//   return (
//     <SafeAreaView>
//       {isLoading && <Text>Loading...!!</Text>}
//       {!isLoading && <Text>Hello JSX world!!!!</Text>}
//     </SafeAreaView>
//   )
// }

// export default function App() {
//   const isLoading = true
//   const children = isLoading ? (
//     <Text>Loading...!@@@!!!</Text>
//   ) : (
//     <Text>Hello JSX world!!@@@</Text>
//   )
//   return <SafeAreaView>{children}</SafeAreaView>
// }

// export default function App() {
//   const children = [
//     <Text>Hello World!</Text>,
//     <Text>Hello World!</Text>,
//     <Text>Hello World!</Text>
//   ]
//   return <SafeAreaView>{children}</SafeAreaView>
// }

// export default function App() {
//   const children = [1, 2, 3].map((i) => <Text>Hello World! {i}</Text>)

//   return <SafeAreaView>{children}</SafeAreaView>
// }

export default function App() {
  const children = new Array(100)
  .fill(null)
  .map((notUsed, index) => <Text>Hello World!! {index}</Text>)

  return <SafeAreaView>{children}</SafeAreaView>
}