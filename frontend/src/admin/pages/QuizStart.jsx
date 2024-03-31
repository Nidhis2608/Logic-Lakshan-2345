import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';




const QuizStart = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Question No
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description
        </Typography>
      </CardContent>
      <FormControl>
  {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel value="option1" control={<Radio />} label="option1" />
    <FormControlLabel value="option2" control={<Radio />} label="option2" />
    <FormControlLabel value="option3" control={<Radio />} label="option3" />
    <FormControlLabel value="option4" control={<Radio />} label="option4" />
  </RadioGroup>
</FormControl>
    </Card>
  );
  };

export default QuizStart;
