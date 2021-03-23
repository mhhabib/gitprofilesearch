import React from 'react'
import {Grid,List} from 'semantic-ui-react';

const Results = (props) => {
    console.log(props.data)
    return (
        <Grid padded>
            <Grid.Row>
                <Grid.Column>
                    <List>
                        {
                            props.data && props.data.map(function(item) {
                                return <List.Item key={item.id}>
                                <List.Content floated='right'>
                                        <List.Icon color="yellow" name='star' />{item.stargazers_count}
                                        <List.Icon color='teal' name='fork' />{item.forks_count}
                                </List.Content>
                                <List.Icon color='brown' name='linkify' />
                                <List.Content>
                                    <a href={item.html_url} target='_blank' rel="noreferrer">{item.full_name}</a>
                                </List.Content>
                                </List.Item>
                            })
                        }
                    </List>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Results;