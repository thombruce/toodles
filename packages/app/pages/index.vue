<template lang="pug">
NuxtLayout(name="default")
  .not-prose
    TntElectronDirectory(
      path="./"
      :recursive="true"
      :filter="/^(?:(?:todo|done)\.txt|.+?\.(?:todo|shop|list))$/i"
      v-slot="{ files }"
    )
      ul.space-y-2
        li(v-for="file in files")
          NuxtLink.font-bold.text-xl(:to="file" :key="file") {{ file }}
</template>
