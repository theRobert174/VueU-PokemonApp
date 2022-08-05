<template>
  <h1 v-if="!pokemon">Espere por favor ...</h1>
  <div v-else>
    <div style="display: relative; height: 110px;">
      <h1>Who's that Pokemon?</h1>
      <h1 class="back-title">Who's that Pokemon?</h1>
    </div>
    <PokemonPicture style="" :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer"/>

    <template v-if="showAnswer" >
      <h2 class="fade-in">{{message}}</h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'

import getPokemonOptions from '@/helpers/getPokemonOptions'
// console.log(getPokemonOptions())

export default {
    components: {
        PokemonPicture,
        PokemonOptions
    },
    data() {
      return {
        pokemonArr: [],
        pokemon: null,
        showPokemon: false,
        message: '',
        showAnswer: false
      }
    },
    methods:{
      async mixPokemonArray(){
        this.pokemonArr = await getPokemonOptions()

        const rndInt = Math.floor(Math.random() * 4)
        this.pokemon = this.pokemonArr[rndInt]
      },

      checkAnswer(selectedId){
        // console.log('Respuesta de evento options', selectedId)
          this.showPokemon = true
          this.showAnswer = true

        if(selectedId === this.pokemon.id){
          this.message = `Correcto, ${this.pokemon.name}`
        }
        else {
          this.message = `Oops, era ${this.pokemon.name}`
        }
      },

      async newGame(){
        this.showPokemon = this.showAnswer = false
        this.pokemonArr = []
        this.pokemon = null
        await this.mixPokemonArray()
      }
    },
    mounted(){
      this.mixPokemonArray()
    }
}
</script>

<style scoped>
  @import url('http://fonts.cdnfonts.com/css/pokemon-hollow');
  h1{
    font-family: 'Pokemon Solid', sans-serif;
    color: gold;
    position: absolute;
    right: 32%;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }
  .back-title{
    font-family: 'Pokemon Hollow', sans-serif;
    color: blue;
  }
</style>