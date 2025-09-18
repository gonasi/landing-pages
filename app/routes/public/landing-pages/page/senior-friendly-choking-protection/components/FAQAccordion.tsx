import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const faqs = [
  {
    title: "How long does delivery take?",
    description:
      "Once your order is placed, it typically takes 1–2 business days to process. A tracking number will be sent to your email. Standard delivery usually takes 7–10 business days.",
  },
  {
    title: "Can I use VitalVac on myself?",
    description:
      "Yes! One of the biggest advantages of VitalVac is that it can be self-administered in a choking emergency, especially after standard anti-choking protocols have failed.",
  },
  {
    title: "At what age or weight can VitalVac be used?",
    description:
      "VitalVac is designed for both children and adults:\n\n1. Children: Safe for use on kids 12 months or older who weigh at least 22 pounds (10 kg).\n\n2. Adults: Comes with a standard adult mask that fits most adults for safety and effectiveness.",
  },
  {
    title: "Can I get a discount if I order more than one VitalVac?",
    description:
      "Yes! We offer discounted bundles so you can equip multiple locations—home, work, or school. Think of VitalVac like a fire extinguisher: having one nearby could save a life.",
  },
  {
    title: "Does VitalVac hurt the patient?",
    description:
      "No. VitalVac is designed to be safe and gentle. With proper training, it can be used effectively without harming the patient.",
  },
  {
    title: "Can VitalVac be used before the Heimlich?",
    description:
      "VitalVac is intended as a backup solution if standard choking protocols, like the Heimlich maneuver, do not succeed. Always attempt recommended first-line procedures first.",
  },
  {
    title: "Can VitalVac be used on anyone who is choking?",
    description:
      "Yes. VitalVac includes both child and adult masks, making it effective for people weighing at least 22 pounds (10 kg) up to full-sized adults and seniors. It’s also suitable for individuals who may not respond well to the Heimlich due to health conditions.",
  },
  {
    title: "Can VitalVac be used more than once?",
    description:
      "VitalVac is a single-use emergency device for sanitary reasons. If it successfully saves a life, we’ll replace your unit for free. During a single emergency, it may be applied multiple times if the obstruction is not cleared immediately. Masks should be inspected and replaced every 2–3 years.",
  },
  {
    title: "Does VitalVac have an expiration date?",
    description:
      "No, VitalVac does not expire. If it’s ever used in an emergency, we’ll replace it at no cost to ensure you’re always protected.",
  },
  {
    title: "Is VitalVac safe for children?",
    description:
      "Yes. VitalVac is designed for safety and effectiveness across all ages, from children to seniors.",
  },
  {
    title: "Do you need to be lying down to use VitalVac?",
    description:
      "No. VitalVac can be used in any position—sitting, standing, or lying down—making it versatile in emergencies.",
  },
  {
    title: "How does the one-way valve work?",
    description:
      "The one-way valve allows air to exit but not return into the airway. When you pull the plunger, it creates suction to dislodge the obstruction. When pushed back, the valve prevents air from forcing the blockage deeper, ensuring a safe and effective clearance.",
  },
  {
    title: "Does the kit include both child and adult masks?",
    description:
      "Yes. Every VitalVac kit comes with both child and adult masks, ensuring the right fit and protection for different ages and sizes.",
  },
];

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border rounded-lg px-4"
        >
          <AccordionTrigger className="text-left hover:no-underline py-4">
            <span className="font-medium">{faq.title}</span>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {faq.description}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
