import React, {Component} from 'react'
import {Grid, Card, CardContent, CardActions, Button, Avatar, Link, Typography} from '@material-ui/core'
import axios from 'axios'

const groups = [
    {
        id: "12313132",
        name: "Associação Académida da Universidade do Minho",
        n_members: 20
    },
    {
        id: "12313132",
        name: "Associação Académida da Universidade do Minho",
        n_members: 20
    },
    {
        id: "12313132",
        name: "Associação Académida da Universidade do Minho",
        n_members: 20
    },
    {
        id: "12313132",
        name: "Associação Académida da Universidade do Minho",
        n_members: 20
    },
    {
        id: "12313132",
        name: "Associação Académida da Universidade do Minho",
        n_members: 20
    },
    {
        id: "12313132",
        name: "Associação Académida da Universidade do Minho",
        n_members: 20
    }
]

class GroupList extends Component {
    constructor(props){
        super(props)
        this.state = {
            groups,
            remove_id: ""
        }
        this.removeGroup = this.removeGroup.bind(this)
    }

    getGroups(){

    }

    removeGroup(){
        axios.delete("link" + "/" + this.props.match.userId + "/groups/" + this.state.remove_id)
        .then(res => {
            this.props.history.push("/" + this.props.match.userId + "/groups")
        })
        .catch(res => {
            console.log(res)
        })
    }

    renderGroups(){
        var newlist = []
        if (groups.length === 0 ) {
            newlist.push(<h3>Não está em nenhum grupo.</h3>);
        }
      
        groups.forEach((g, index) =>
            newlist.push(
                <Grid item xs={1}>
                    <Card style={{textAlign:"center"}}>
                        <CardContent>
                            <Typography color="textSecondary">
                                <Link href={"/" + this.props.match.userId + "/groups/" + g.id}>
                                    {g.name}
                                </Link>
                            </Typography>
                            <Typography color="textSecondary">
                                Membros: {g.n_members}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={this.removeGroup}>Remove</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )   
        )

        return newlist
    }


    render() {
        return (
            <div>
               <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component={'h1'}
                            variant={'h3'}
                        >
                            Grupos
                        </Typography>
                        <Grid container spacing={2}>
                            {this.renderGroups()}
                        </Grid>
                   </Grid>
               </Grid>
            </div>
        )
    }
}

export default GroupList