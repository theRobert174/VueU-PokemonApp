import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from '@/pages/PokemonPage'
import {pokemons} from '../mocks/pokemons.mock'

describe('PokemonPage Component', () => {

    let wrapper
    let mixPokemonArraySpy

    beforeEach(() => {
        mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        wrapper = shallowMount(PokemonPage)
    })

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe llamar mixPokemonArray al montar', () => {
        expect(mixPokemonArraySpy).toHaveBeenCalled()
    })

    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                  pokemonArr: pokemons,
                  pokemon: pokemons[0],
                  showPokemon: false,
                  message: '',
                  showAnswer: false,
                  isCorrect: false
                }
              }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                  pokemonArr: pokemons,
                  pokemon: pokemons[0],
                  showPokemon: false,
                  message: '',
                  showAnswer: false,
                  isCorrect: false
                }
              }
        })


        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')

        //PokemonPicture debe de existir
        expect(picture.exists()).toBeTruthy()
        //PokemonOptions debe de existir
        expect(options.exists()).toBeTruthy()
        //PokemonPicture attribute pokemonid === 5'
        expect(picture.attributes('pokemonid')).toBe('5')
        //PokemonOptions attribute pokemons toBe true
        expect(options.attributes('pokemons')).toBeTruthy()
    })

    test('pruebas con checkAnswer', async () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                  pokemonArr: pokemons,
                  pokemon: pokemons[0],
                  showPokemon: false,
                  message: '',
                  showAnswer: false,
                  isCorrect: false
                }
              }
        })

        await wrapper.vm.checkAnswer(5)
        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`)

        await wrapper.vm.checkAnswer(10)
        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`)
    })
})