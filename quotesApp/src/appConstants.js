export const quotesAndAuthor = {
    quotes: ["On a dû te dire qu'il fallait dans la vie ; moi je te dis qu'il faut vivre, c'est la plus grande réussite du monde.", "La seule réalité qui soit au Monde est la passion de grandir.", "Sans l'Amour le monde serait inanimé. Chaque atome est épris de cette perfection et se hâte vers elle. À chaque instant retentit de tous côtés l'appel de l'Amour.", "Les hommes naissent tous en état de guerre, et la première loi naturelle est la guerre de tous contre tous.","N'attendez pas le Jugement dernier. Il a lieu tous les jours."],
    author: ['Jean Giono', 'Pierre Teilhard de Chardin', 'Djalâl Al-Dîn Rûmi', 'Montesquieu','Albert Camus']
}

export const colorList = ['#16a085',
'#27ae60',
'#2c3e50',
'#f39c12',
'#e74c3c',
'#9b59b6',
'#FB6964',
'#342224',
'#472E32',
'#BDBB99',
'#77B1A9',
'#73A857']

export const generateRandom = (length = quotesAndAuthor.quotes.length) => Math.floor(Math.random()*length)