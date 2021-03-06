import { Command } from 'discord.js-commando'
import cube from 'scrambler-util'

class Scramble extends Command {
  constructor (client) {
    super(client, {
      name: '3x3',
      aliases: ['three-by-three', '3x3x3', '3', 'oh', 'feet', 'threebythree'],
      group: 'generators',
      memberName: '3x3',
      description: 'Generates scrambles for 3x3 with options for BLD and FMC.',
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 5
      },
      args: [
        {
          key: 'args',
          type: 'string',
          prompt: 'Correct syntax: s!3x3 [fmc|bld] [# of scrambles]. For more help, see https://docs.scramblr.app/docs/scramblers/args',
          default: ''
        }
      ]
    })
  }

  run (message, { args }) {
    const params = args.split(' ')
    const bld = params[0] === 'bld'
    const fmc = params[0] === 'fmc'
    let count = parseInt(bld || fmc ? params[1] : params[0])
    count = count ? count > 12 ? 12 : count < 0 ? undefined : count : undefined
    const scrambles = cube('333', count, bld || fmc ? params[0] : null)
    let scrambleStr = ''
    for (let i = 0; i < scrambles.length; i++) {
      scrambleStr += `${count > 1 ? `${i + 1}: ` : ''}${scrambles[i]}\n\n`
    }
    return message.say(scrambleStr)
  }
};

module.exports = Scramble
