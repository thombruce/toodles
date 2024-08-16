<template lang="pug">
NuxtLayout(name="default")
  .not-prose
    TntElectronDirectory(
      path=""
      :extensions="/(?:\.(?:txt|todo|shop|list))$/i"
      :filter="/^(?:(?:todo|done)\.txt|.+?\.(?:todo|shop|list))$/i"
      v-slot="{ files }"
    )
</template>
