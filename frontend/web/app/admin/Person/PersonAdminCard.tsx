import React from 'react'
import { PersonAdminCardFragment } from 'frontend.web/queries'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Button,
} from '@material-ui/core'
import {
  MarkdownView,
  Toggle,
  DiscloseButton,
  CardImage,
} from 'frontend.web/app/common/Widgets/Widgets'

interface PersonAdminCardProps {
  person: PersonAdminCardFragment
  onEdit: (organiser: PersonAdminCardFragment) => void
}

export function PersonAdminCard({
  person,
  onEdit,
}: PersonAdminCardProps) {
  return (
    <Card>
      <CardImage src={person.photo && person.photo.sourceUrl}>
        <Typography color="inherit" variant="headline">
          {person.name}
        </Typography>
      </CardImage>

      <Toggle>
        {({ active: bioVisible, toggle: toggleBio }) => (
          <>
            <CardActions>
              <DiscloseButton disclosed={bioVisible} onClick={toggleBio} />
            </CardActions>
            {person.bio && (
              <Collapse in={bioVisible}>
                <CardContent>
                  <MarkdownView value={"Bio: "+person.bio +  (person.twitterHandle && "\n\n" + "Twitter: " + person.twitterHandle)} />
                </CardContent>
              </Collapse>
            )}
          </>
        )}
      </Toggle>
      <Button onClick={()=>onEdit(person)}>Edit</Button>
    </Card>
  )
}
