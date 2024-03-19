const graphql = require('graphql');
const {
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLInt,
    GraphQLString, 
    GraphQLList
} = require('graphql');
const userData = require("../MOCK_DATA.json");
const UserType = require('./TypeDefs/UserType');


//this is where create the different get-operations (queries)
const RooteQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType), //a list of users
            args: { id: {type: GraphQLInt}}, //arguments for the query, fx an ID
            resolve(parent, args) {
                //SQL-statments here fx or ORM-statements
                return userData
            }
        },
        //we could add anothter query here if we wanted
    }
});

//create, update and delete data
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args){
                //SQL insertion here 
                //password encrypt here
                userData.push({id: userData.length + 1, firstName: args.firstName, lastName: args.lastName, email: args.email, password: args.password});
                return args
            }
        }
    }
});


module.exports =  new GraphQLSchema({query: RooteQuery, mutation: Mutation});