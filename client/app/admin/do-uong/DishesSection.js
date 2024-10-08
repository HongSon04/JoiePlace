import CustomInput from "@/app/_components/CustomInput";
import Dish from "@/app/_components/Dish";
import { dishCategories } from "@/app/_utils/config";
import { _require } from "@/app/_utils/validations";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button, Spinner } from "@nextui-org/react";
import { Col, Row } from "antd";
import { Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";

function DishesSection({ dishesType }) {
  const dishes = {
    "Nước tinh khiết": [
      {
        id: 1,
        name: "Gỏi cuốn",
        price: 2600000,
        image:
          "https://plus.unsplash.com/premium_photo-1661771822467-e516ca075314?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        id: 2,
        name: "Gỏi ngó súng",
        price: 2600000,
        image:
          "https://plus.unsplash.com/premium_photo-1661771822467-e516ca075314?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        id: 3,
        name: "Gỏi ngó sen",
        price: 2600000,

        image:
          "https://plus.unsplash.com/premium_photo-1661771822467-e516ca075314?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        id: 4,
        name: "Gỏi ngó súng",
        price: 2600000,
        image:
          "https://plus.unsplash.com/premium_photo-1661771822467-e516ca075314?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
    "Đồ uống có cồn": [
      {
        id: 3,
        name: "Cá kho tộ",
        price: 100000,
        image:
          "https://plus.unsplash.com/premium_photo-1661771822467-e516ca075314?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        id: 4,
        name: "Gà nướng",
        price: 100000,
        image:
          "https://plus.unsplash.com/premium_photo-1661771822467-e516ca075314?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
    "Nước ngọt": [
      {
        id: 5,
        name: "Chè",
        price: 30000,
        image:
          "https://plus.unsplash.com/premium_photo-1661771822467-e516ca075314?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        id: 6,
        name: "Kem",
        price: 20000,
        image:
          "https://plus.unsplash.com/premium_photo-1661771822467-e516ca075314?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
  }[dishesType];

  const methods = useForm();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">{dishesType}</h2>
        <Button
          isIconOnly
          className="bg-whiteAlpha-100"
          radius="full"
          onClick={onOpen}
        >
          <PlusIcon className="w-5 h-5 text-white font-semibold" />
        </Button>
      </div>
      <Row gutter={[12, 12]} className="mt-3">
        {dishes.map((dish, index) => (
          <Dish key={index} dish={dish} />
        ))}
        {/* Add button */}
        <Col
          span={8}
          md={{
            span: 6,
          }}
        >
          <div className="bg-whiteAlpha-100 p-3 group rounded-lg shadow-md flex items-center hover:whiteAlpha-200 cursor-pointer flex-center h-full">
            <Button
              onPress={onOpen}
              isIconOnly
              className="!bg-transparent"
              radius="full"
            >
              <PlusIcon className="w-5 h-5 text-white font-semibold" />
            </Button>
          </div>
        </Col>
      </Row>

      {/* MODAL */}
      {isOpen && (
        <Suspense fallback={<Spinner color="secondary" />}>
          <>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
            >
              <ModalContent>
                {(onClose) => (
                  <FormProvider {...methods}>
                    <form>
                      <ModalHeader className="flex flex-col gap-1">
                        Thêm đồ uống
                      </ModalHeader>
                      <ModalBody>
                        <CustomInput
                          name="name"
                          ariaLabel={"Tên đồ uống"}
                          autoFocus={true}
                          label="Tên đồ uống"
                          placeholder="Nhập tên đồ uống"
                          variant="bordered"
                          validation={_require}
                          classNames={{
                            input: "bg-blackAlpha-100",
                            label: "text-gray-600 font-semibold",
                          }}
                        />
                        <CustomInput
                          name="price"
                          ariaLabel={"Giá đồ uống"}
                          label="Giá đồ uống / 1 suất"
                          placeholder="Nhập giá đồ uống"
                          type="password"
                          variant="bordered"
                          validation={_require}
                          className={"mt-5"}
                          classNames={{
                            input: "bg-blackAlpha-100",
                            label: "text-gray-600 font-semibold",
                          }}
                        />
                        <div className="flex flex-col">
                          <h4 className="text-gray-600 font-semibold text-small mb-1">
                            Danh mục đồ uống
                          </h4>
                          <select
                            required
                            className="w-full bg-gray-100"
                            label="Danh mục đồ uống"
                            areaLabel="Danh mục đồ uống"
                            name="dishCategory"
                          >
                            {dishCategories.map((category) => (
                              <option key={category.id} value={category.key}>
                                {category.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          onPress={onClose}
                          startContent={<XMarkIcon />}
                        >
                          Hủy
                        </Button>
                        <Button
                          className="bg-blue-400 hover:bg-blue-500 text-white"
                          onPress={onClose}
                          startContent={<PlusIcon className="w-4 h-4" />}
                        >
                          Thêm
                        </Button>
                      </ModalFooter>
                    </form>
                  </FormProvider>
                )}
              </ModalContent>
            </Modal>
          </>
        </Suspense>
      )}
    </div>
  );
}

export default DishesSection;
