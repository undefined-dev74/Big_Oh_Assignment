import { FormInput } from "@/components/Forms/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Grid,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const steps = ["User Information", "Family Details"];

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  parentNames: z.string().min(1, {
    message: "Parent name is required.",
  }),
  phoneNumber: z
    .string()
    .min(1, {
      message: "Phone no is required",
    })
    .max(10, "Invalid phone number"),
  email: z.string().email(),
  address: z.string().min(1, "Address is required"),
  familyMembers: z
    .array(
      z.object({
        name: z.string().superRefine(({ stepper }) => console.log(stepper)),
        email: z.string(),
      })
    )
    .min(1, "AtLeast one family member is required!"),
});

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);

  const { control, handleSubmit, reset, getValues, trigger, setValue } =
    useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      mode: "onBlur",
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        parentNames: "",
        phoneNumber: "",
        familyMembers: [{ name: "", email: "" }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "familyMembers",
  });

  const handleNext = async () => {
    const isValid = await trigger(); //
    console.log(isValid);
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  // submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Alert variant="filled" color="success">
              Details submitted successfully
            </Alert>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item lg={4}>
                <Typography variant="subtitle1">First Name</Typography>
                <Typography variant="caption">
                  {getValues().firstName}
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="subtitle1">Last Name</Typography>
                <Typography variant="caption">
                  {getValues().lastName}
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="subtitle1">Email Address</Typography>
                <Typography variant="caption">{getValues().email}</Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="subtitle1">Phone Number</Typography>
                <Typography variant="caption">
                  {getValues().phoneNumber}
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="subtitle1">Address</Typography>
                <Typography variant="caption">{getValues().address}</Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="subtitle1">Parent Name</Typography>
                <Typography variant="caption">
                  {getValues().parentNames}
                </Typography>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="h6">Family Details</Typography>
                {getValues().familyMembers.map((item) => (
                  <ListItemButton component="div">
                    <ListItemText primary={item.name} secondary={item.email} />
                  </ListItemButton>
                ))}
              </Grid>
            </Grid>
            <Box sx={{ flex: "1 1 auto", mt: 1 }}>
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box mt={2} component={"form"} onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 ? (
              <Grid
                container
                flexDirection="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item lg={4}>
                  <FormInput
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    control={control}
                  />
                </Grid>
                <Grid item lg={4}>
                  <FormInput
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    control={control}
                  />
                </Grid>
                <Grid item lg={4}>
                  <FormInput
                    name="email"
                    label="Email Address"
                    placeholder="john.doe@email.com"
                    control={control}
                  />
                </Grid>
                <Grid item lg={4}>
                  <FormInput
                    type="number"
                    name="phoneNumber"
                    label="Mobile No"
                    control={control}
                  />
                </Grid>
                <Grid item lg={4}>
                  <FormInput
                    name="address"
                    label="Address"
                    placeholder="Palm Street 1"
                    control={control}
                  />
                </Grid>
                <Grid item lg={4}>
                  <FormInput
                    name="parentNames"
                    label="Parent Name"
                    control={control}
                  />
                </Grid>
              </Grid>
            ) : null}
            {activeStep === 1 ? (
              <Grid
                mt={1}
                container
                flexDirection="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                {fields.map((field, index) => (
                  <>
                    <Grid item lg={4}>
                      <FormInput
                        key={field.id}
                        name={`familyMembers.${index}.name`}
                        label="First Name"
                        placeholder="John"
                        control={control}
                      />
                    </Grid>
                    <Grid item lg={4}>
                      <FormInput
                        key={field.id}
                        name={`familyMembers.${index}.email`}
                        label="Email"
                        placeholder="John.doe@gmail.com"
                        control={control}
                      />
                    </Grid>
                    <Grid item>
                      <Stack direction="row" spacing={2}>
                        <Button
                          onClick={() => {
                            if (fields.length === 1) return;
                            remove(index);
                          }}
                          variant="contained"
                          color="secondary"
                        >
                          Remove
                        </Button>
                      </Stack>
                    </Grid>
                  </>
                ))}
                <Grid item lg={12}>
                  <Button
                    onClick={() => append({ name: "", email: "" })}
                    variant="contained"
                  >
                    Add Family Member
                  </Button>
                </Grid>
              </Grid>
            ) : null}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext} type="submit">
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
