'use strict';
const stripe = require('stripe')('sk_test_EKS4hgjrwDEwPGwBvx1Sf4pF00rzapgP0r')


/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    create: async ctx => {
        const { name, total, items, stripeTokenId } = ctx.request.body
        const { id } = ctx.state.user
        const charge = await stripe.charges.create({
            amount: total * 100,
            currency: 'usd',
            description: `Order ${new Date()} by ${ctx.state.user.username}`,
            source: stripeTokenId
        })
        // creates new charge
        const order = await strapi.services.order.create({
            name, total, items, user: id
        })
        return order

    }
};
