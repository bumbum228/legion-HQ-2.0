import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DataContext from '../components/DataContext';

class CardImage extends React.PureComponent {

  static contextType = DataContext;

  state = {};

  generateKeywordChips(cardKeywords) {
    const { keywordDict, classes } = this.context;
    const keywordChips = [];
    cardKeywords.forEach((cardKeyword) => {
      keywordChips.push(
        <Tooltip
          key={cardKeyword}
          title={(
            <Typography variant="body1">
              {keywordDict[cardKeyword] ? keywordDict[cardKeyword] : 'No definition found.'}
            </Typography>
          )}
        >
          <Chip
            label={cardKeyword}
            className={classes.keywordChip}
            style={{ cursor: 'help' }}
          />
        </Tooltip>
      );
    });
    return keywordChips;
  }

  render() {
    const {
      allCards,
      classes,
      factions
    } = this.context;
    const {
      customImageLocation,
      cardId,
      size,
      unitCount,
      additionalStyles,
      showKeywords,
      handleClick,
      isDisabled
    } = this.props;
    const cardData = allCards[cardId];
    const cardSizes = {
      unit: {
        vsmall: {
          height: '217px',
          width: '304px'
        },
        small: {
          height: '250px',
          width: '350px'
        },
        medium: {
          height: '275px',
          width: '385px'
        },
        large: {
          height: '300px',
          width: '420px'
        }
      },
      upgrade: {
        vsmall: {
          height: '201.5px',
          width: '130px'
        },
        small: {
          height: '248px',
          width: '160px'
        },
        medium: {
          height: '310px',
          width: '200px'
        },
        large: {
          height: '340px',
          width: '220px'
        },
        doubleSided: {
          vsmall: {
            height: '217px',
            width: '280px'
          },
          small: {
            height: '248px',
            width: '320px'
          },
          medium: {
            height: '310px',
            width: '400px'
          },
          large: {
            height: '340px',
            width: '440px'
          },
        }
      },
      command: {
        vsmall: {
          width: '217px',
          height: '304px'
        },
        small: {
          width: '250px',
          height: '350px'
        },
        medium: {
          width: '275px',
          height: '385px'
        },
        large: {
          width: '300px',
          height: '420px'
        }
      },
      battle: {
        vsmall: {
          height: '217px',
          width: '304px'
        },
        small: {
          width: '350px',
          height: '250px'
        },
        medium: {
          width: '385px',
          height: '275px'
        },
        large: {
          width: '420px',
          height: '300px'
        },
        skirmish: {
          vsmall: {
            width: '217px',
            height: '304px'
          },
          small: {
            height: '350px',
            width: '250px'
          },
          medium: {
            height: '385px',
            width: '275px'
          },
          large: {
            height: '420px',
            width: '300px'
          },
        }
      }
    };
    let styles = {
      marginRight: 5,
      marginBottom: 5,
      borderRadius: 10,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
    };
    let cardStyles = cardSizes[cardData.cardType][size];
    if (cardData.cardType === 'battle' && cardData.keywords.includes('Skirmish')) {
      cardStyles = cardSizes[cardData.cardType].skirmish[size];
    }
    if (cardData.cardType === 'upgrade' && cardData.keywords.includes('Reconfigure')) {
      cardStyles = cardSizes[cardData.cardType]['doubleSided'][size];
    }
    styles = { ...styles, ...cardStyles };
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <div
            style={{
              backgroundColor: 'transparent',
              width: 18,
              height: '217px',
              borderRadius: 5,
              border: `2px solid ${cardData.faction ? factions[cardData.faction].color : 'rgba(255, 255, 255, 0.23)'}`,
              display: unitCount > 1 ? 'inline-block' : 'none'
            }}
          >
            <Typography
              variant="subtitle1"
              color="primary"
              style={{
                position: 'relative',
                top: '90px',
                left: 4
              }}
            >
              {unitCount}
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <Card
            className={classes.cardImage}
            style={{
              width: cardStyles.width,
              ...additionalStyles
            }}
          >
            <CardActionArea onClick={handleClick ? () => handleClick() : undefined}>
              <CardMedia
                title={cardData.cardName}
                image={customImageLocation ? customImageLocation : cardData.imageLocation}
                style={{ ...styles }}
              />
            </CardActionArea>
            <div style={{ margin: '-2px' }}>
              {showKeywords && (
                <CardActions disableSpacing className={classes.cardAction}>
                  <Tooltip
                    key="cost"
                    title={(
                      <Typography variant="body1">
                        Current points cost based off current errata.
                      </Typography>
                    )}
                  >
                    <Chip
                      label={cardData.cost}
                      className={classes.keywordChip}
                      style={{ cursor: 'help' }}
                    />
                  </Tooltip>
                  {this.generateKeywordChips(cardData.keywords)}
                </CardActions>
              )}
            </div>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default CardImage;
